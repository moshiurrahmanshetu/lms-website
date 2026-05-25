import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "brand" | "brand-gradient" | "success" | "warning" | "error" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            // Default variant
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm": variant === "default",
            // Secondary variant
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm": variant === "secondary",
            // Outline variant
            "border border-border bg-background hover:bg-accent hover:text-accent-foreground shadow-sm": variant === "outline",
            // Ghost variant
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            // Brand variant
            "bg-brand-600 text-white hover:bg-brand-700 shadow-md": variant === "brand",
            // Brand gradient variant
            "bg-gradient-primary text-white hover:opacity-90 shadow-md": variant === "brand-gradient",
            // Success variant
            "bg-success text-success-foreground hover:bg-success/90 shadow-sm": variant === "success",
            // Warning variant
            "bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm": variant === "warning",
            // Error variant
            "bg-error text-error-foreground hover:bg-error/90 shadow-sm": variant === "error",
            // Link variant
            "text-primary underline-offset-4 hover:underline": variant === "link",
          },
          {
            // Size variants
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-9 px-3 text-xs": size === "sm",
            "h-11 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
