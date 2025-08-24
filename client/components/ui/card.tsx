import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("w-full bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "p-6 rounded-lg",
      modal: "p-5 rounded-[1.2rem]",
    },
    bordered: {
      true: "border border-ui-card",
      false: "shadow-gray-100 shadow-sm",
    },
    padding: {
      lg: "p-5",
      xl: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CardProps = {
  className?: string;
  children: ReactNode;
  bordered?: boolean;
} & VariantProps<typeof cardVariants>;

const Card = ({
  className,
  children,
  variant,
  padding,
  bordered = false,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(cardVariants({ variant, bordered, padding }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
