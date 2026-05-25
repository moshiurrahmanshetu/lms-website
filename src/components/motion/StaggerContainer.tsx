"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations/presets";
import { useReducedMotion } from "framer-motion";

interface StaggerContainerProps {
  className?: string;
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  className,
  children,
  staggerDelay = 0.1,
  delayChildren = 0.2,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
