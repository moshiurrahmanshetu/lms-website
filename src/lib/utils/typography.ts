// Typography scale utilities for consistent text sizing
export const typography = {
  // Display sizes
  display: {
    xl: "text-6xl font-bold tracking-tight",
    lg: "text-5xl font-bold tracking-tight",
    md: "text-4xl font-bold tracking-tight",
  },
  // Heading sizes
  heading: {
    xl: "text-3xl font-semibold tracking-tight",
    lg: "text-2xl font-semibold tracking-tight",
    md: "text-xl font-semibold tracking-tight",
    sm: "text-lg font-medium tracking-tight",
  },
  // Body sizes
  body: {
    lg: "text-base leading-relaxed",
    md: "text-sm leading-normal",
    sm: "text-xs leading-normal",
  },
  // Label sizes
  label: {
    lg: "text-sm font-medium",
    md: "text-xs font-medium",
    sm: "text-xs font-medium",
  },
  // Caption sizes
  caption: {
    lg: "text-xs",
    md: "text-[10px]",
    sm: "text-[9px]",
  },
} as const;

// Text color utilities
export const textColors = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  accent: "text-accent-foreground",
  brand: "text-brand",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
} as const;

// Font weight utilities
export const fontWeights = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;
