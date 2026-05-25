"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface HoverLiftProps {
  className?: string;
  children: React.ReactNode;
}

export function HoverLift({ className, children }: HoverLiftProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      whileTap={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
