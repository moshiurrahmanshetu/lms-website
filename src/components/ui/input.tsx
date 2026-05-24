import React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "underlined";
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          {
            // Default variant
            "h-10 border border-input bg-background px-3 py-2": variant === "default",
            // Filled variant
            "h-10 border-0 bg-secondary px-3 py-2 focus-visible:bg-secondary/80": variant === "filled",
            // Underlined variant
            "h-10 border-0 border-b-2 border-input bg-transparent px-0 py-2 rounded-none focus-visible:border-ring": variant === "underlined",
            // Error state
            "border-error focus-visible:ring-error": error,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
