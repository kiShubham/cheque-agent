import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues } from "react-hook-form";

import { Input, InputVariantProps } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form" | "size">,
    InputVariantProps {
  form: FieldValues;
  label: string;
  name: string;
  icon?: React.ReactNode;
}

const FormTextInput: React.FC<IProps> = ({
  form,
  label,
  name,
  type = "text",
  icon = null,
  className,
  variant,
  size,
  br,
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-1">
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
                type={type}
                variant={variant}
                size={size}
                className={className}
                {...props}
                {...field}
                value={field.value ?? props.value ?? undefined}
              />
            </FormControl>
            {icon && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer px-3 py-2">
                {icon}
              </div>
            )}
          </div>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormTextInput;
