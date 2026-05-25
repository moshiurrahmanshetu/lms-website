import { lazy } from "react";

// Lazy load motion components for better performance
export const LazyMotionWrapper = lazy(() =>
  import("@/components/motion/MotionWrapper").then((mod) => ({
    default: mod.MotionWrapper,
  }))
);

export const LazyStaggerContainer = lazy(() =>
  import("@/components/motion/StaggerContainer").then((mod) => ({
    default: mod.StaggerContainer,
  }))
);

export const LazyHoverLift = lazy(() =>
  import("@/components/motion/HoverLift").then((mod) => ({
    default: mod.HoverLift,
  }))
);
