import React from "react";
import { cn } from "@/lib/utils/cn";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display" | "xl" | "lg" | "md" | "sm";
  weight?: "regular" | "medium" | "semibold" | "bold";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h2", size = "lg", weight = "semibold", children, ...props }, ref) => {
    const sizeClasses = {
      display: "text-4xl sm:text-5xl md:text-6xl",
      xl: "text-3xl sm:text-4xl",
      lg: "text-2xl sm:text-3xl",
      md: "text-xl sm:text-2xl",
      sm: "text-lg sm:text-xl",
    };

    const weightClasses = {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const Tag = level;

    return (
      <Tag
        ref={ref}
        className={cn(
          "tracking-tight text-foreground",
          sizeClasses[size],
          weightClasses[weight],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };
