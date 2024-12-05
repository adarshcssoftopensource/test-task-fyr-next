"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const renderIcon = (icon: React.ReactNode, position: string) => {
  return icon ? (
    <div
      className={cn(
        `absolute top-[50%] -translate-y-[50%] ${
          position === "left" ? "left-[14px]" : "right-[14px]"
        }`
      )}
    >
      {icon}
    </div>
  ) : null;
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string | React.ReactNode;
  hasError?: boolean;
  position?: "right" | "left";
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      icon,
      hasError = false,
      containerClassName,
      id,
      position = "left",
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("group relative w-full", containerClassName)}>
        <input
          ref={ref}
          aria-labelledby={id}
          className={cn(
            "flex h-12 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm font-[0.875] leading-[1.25rem] text-[#1A1C1E] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#969798] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            { "pl-9": icon },
            {
              "border-2 border-destructive focus-visible:ring-0": hasError,
            },
            className
          )}
          {...props}
        />
        {renderIcon(icon, position)}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
