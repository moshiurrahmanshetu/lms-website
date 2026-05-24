import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "xl";
  centered?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, size = "md", centered = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full",
          {
            "py-8": size === "sm",
            "py-12": size === "md",
            "py-16": size === "lg",
            "py-24": size === "xl",
          },
          className
        )}
        {...props}
      >
        <div
          className={cn("w-full", {
            "container mx-auto px-4 sm:px-6 lg:px-8": centered,
          })}
        >
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
