import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants: Record<string, string> = {
  primary: "bg-gradient-to-r from-primary to-accent text-white shadow-soft hover:shadow-glow hover:-translate-y-0.5",
  secondary: "bg-white text-primary border border-primary/20 hover:bg-primary/5",
  outline: "bg-transparent border border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-soft hover:shadow-lg hover:-translate-y-0.5",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
