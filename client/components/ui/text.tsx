import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  /* the order of variants matter on which class will be applied */
  variants: {
    variant: {
      caption: "text-xs font-normal",
      body: "text-sm font-normal",
      label: "text-sm font-semibold",
      title: "text-base font-semibold",
      subheading: "text-2xl font-medium",
      heading: "text-2xl font-bold",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      danger: "text-red-500",
      success: "text-green-500",
      foreground: "text-foreground",
      primary: "text-primary",
      link: "text-link",
    },
  },
  defaultVariants: {
    color: "default",
    variant: "body",
  },
});

type AsProp<T extends React.ElementType> = {
  as?: T;
};

type TextProps<T extends React.ElementType> = AsProp<T> &
  VariantProps<typeof textVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof AsProp<T>>;

export function Text<T extends React.ElementType = "p">({
  as,
  title,
  className,
  size,
  weight,
  color,
  variant,
  children,
  ...props
}: TextProps<T>) {
  const Component = as || "p";
  return (
    <Component
      title={title}
      className={cn(textVariants({ variant, size, weight, color }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
