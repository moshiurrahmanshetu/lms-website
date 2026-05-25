"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, scaleIn, slideUp } from "@/lib/animations/presets";
import { useReducedMotion } from "framer-motion";

interface MotionWrapperProps {
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-up";
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export function MotionWrapper({
  variant = "fade-up",
  delay = 0,
  className,
  children,
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    "fade-up": fadeUp,
    "fade-in": fadeIn,
    "scale-in": scaleIn,
    "slide-up": slideUp,
  };

  const selectedVariant = variants[variant];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
