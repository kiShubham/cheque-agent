"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

import { Input, InputVariantProps } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Eye, EyeClosed } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form" | "size">,
    InputVariantProps {
  form: FieldValues;
  label: string;
  name: string;
}

const FormPasswordInput: React.FC<IProps> = ({
  form,
  label,
  name,
  className,
  variant,
  size,
  br,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-1 relative">
          <Text>
            {label}
            {props.required ? (
              <Text variant="caption" color="danger" as="sup">
                {" "}
                *
              </Text>
            ) : null}
          </Text>
          <div className="relative">
            <FormControl>
              <Input
                br={br}
                size={size}
                variant={variant}
                className={cn(className)}
                type={showPassword ? "text" : "password"}
                {...props}
                {...field}
                value={field.value ?? props.value ?? undefined}
              />
            </FormControl>
            <Button
              variant="ghost"
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-inherit"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye size={20} strokeWidth={1.7} />
              ) : (
                <EyeClosed size={20} strokeWidth={1.7} />
              )}
            </Button>
          </div>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormPasswordInput;
