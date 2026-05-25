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
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            // Default variant - subtle lift and glow
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-0.5": variant === "default",
            // Secondary variant - subtle border animation
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md hover:-translate-y-0.5": variant === "secondary",
            // Outline variant - elegant hover fill
            "border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent/50 shadow-sm hover:shadow-md": variant === "outline",
            // Ghost variant - elegant hover fill
            "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5": variant === "ghost",
            // Brand variant - glow effect
            "bg-brand-600 text-white hover:bg-brand-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:shadow-brand-500/25": variant === "brand",
            // Brand gradient variant - gradient shift and glow
            "bg-gradient-primary bg-card hover:opacity-90 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:shadow-brand-500/30 btn-glow": variant === "brand-gradient",
            // Success variant - subtle lift
            "bg-success text-success-foreground hover:bg-success/90 shadow-sm hover:shadow-md hover:-translate-y-0.5": variant === "success",
            // Warning variant - subtle lift
            "bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm hover:shadow-md hover:-translate-y-0.5": variant === "warning",
            // Error variant - subtle lift
            "bg-error text-error-foreground hover:bg-error/90 shadow-sm hover:shadow-md hover:-translate-y-0.5": variant === "error",
            // Link variant - elegant underline motion
            "text-primary underline-offset-4 hover:underline decoration-2 underline-primary/50 hover:decoration-primary transition-all duration-300": variant === "link",
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
