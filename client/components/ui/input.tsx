import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const inputVariants = tv({
  base: "text-foreground placeholder:font-light text-base placeholder:text-muted-foreground transition w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
  variants: {
    variant: {
      default: "border bg-transparent",
      outline: "border-1 !border-custom bg-white",
      secondary: "bg-gray-100 border-0",
    },
    size: {
      lg: "h-[2.85rem] px-4 text-base",
      sm: "h-9 px-3 text-sm",
    },
    br: {
      lg: "rounded-lg",
      md: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
    br: "md",
  },
});

export type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, br, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ variant, size, br }),
          "file:text-foreground placeholder:text-muted-foreground selection:bg-blue-400 selection:text-white dark:bg-input/30 border-input flex min-w-0 shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
