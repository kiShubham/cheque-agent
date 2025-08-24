import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const textAreaVariants = cva(
  "border-input text-foreground placeholder:text-muted-foreground placeholder:font-light focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border bg-transparent",
        outline: "border-1 border-custom bg-white",
        secondary: "bg-gray-100 border-0",
      },
      fontSize: {
        base: "text-base",
        sm: "text-sm",
      },
      br: {
        lg: "rounded-lg",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      fontSize: "sm",
      br: "md",
    },
  }
);

export type TextVariantProps = VariantProps<typeof textAreaVariants>;
export type TextAreaProps = React.ComponentProps<"textarea"> & TextVariantProps;

function Textarea({
  className,
  variant,
  fontSize,
  br,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textAreaVariants({ variant, fontSize, br }), className)}
      {...props}
    />
  );
}

export { Textarea };
