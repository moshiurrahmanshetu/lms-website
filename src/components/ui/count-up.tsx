"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  start?: number;
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  start = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setCount(end);
      }
      return;
    }

    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + (end - start) * easeOutQuart;

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration, start, prefersReducedMotion]);

  const formattedCount = count.toFixed(decimals);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {prefix}
      {formattedCount}
      {suffix}
    </motion.span>
  );
}

// Helper function to parse value string to number and extract suffix/prefix
export function parseValueString(value: string): {
  number: number;
  suffix: string;
  prefix: string;
  decimals: number;
} {
  let prefix = "";
  let suffix = "";
  let numberStr = value;

  // Extract prefix (e.g., $)
  const prefixMatch = value.match(/^([^\d]+)/);
  if (prefixMatch) {
    prefix = prefixMatch[1];
    numberStr = value.slice(prefix.length);
  }

  // Extract suffix (e.g., +, %, K, M, /7)
  const suffixMatch = numberStr.match(/([^\d.]+)$/);
  if (suffixMatch) {
    suffix = suffixMatch[1];
    numberStr = numberStr.slice(0, -suffix.length);
  }

  // Handle K and M suffixes
  let number = parseFloat(numberStr.replace(/,/g, ""));
  if (suffix === "K") {
    number = number * 1000;
    suffix = "K";
  } else if (suffix === "M") {
    number = number * 1000000;
    suffix = "M";
  }

  // Handle decimals
  const decimals = numberStr.includes(".") ? numberStr.split(".")[1].length : 0;

  return {
    number,
    suffix,
    prefix,
    decimals,
  };
}
