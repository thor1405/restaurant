import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center font-medium uppercase tracking-widest transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
            {
              "bg-(--color-accent) text-black hover:bg-(--color-accent-hover) hover:shadow-[0_0_20px_rgba(200,164,93,0.3)]": variant === "primary",
              "bg-white text-black hover:bg-white/90": variant === "secondary",
              "border border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent) hover:text-black": variant === "outline",
              "text-black hover:text-(--color-accent)": variant === "ghost",
              "px-4 py-2 text-xs": size === "sm",
              "px-8 py-3 text-sm": size === "md",
              "px-10 py-4 text-base": size === "lg",
            },
            className
          )
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
