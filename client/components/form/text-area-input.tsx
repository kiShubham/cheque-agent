import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues } from "react-hook-form";

import { Text } from "@/components/ui/text";
import { Textarea, TextVariantProps } from "@/components/ui/textarea";

interface IProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "form" | "rows"
    >,
    TextVariantProps {
  form: FieldValues;
  label: string;
  name: string;
  rows?: number;
}

const FormTextAreaInput: React.FC<IProps> = ({
  form,
  label,
  name,
  className,
  rows = 4,
  fontSize,
  variant,
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
          <FormControl>
            <Textarea
              br={br}
              variant={variant}
              fontSize={fontSize}
              className={className}
              rows={rows}
              {...props}
              {...field}
              value={field.value ?? props.value ?? undefined}
            />
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormTextAreaInput;
