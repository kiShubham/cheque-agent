import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues } from "react-hook-form";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";

interface Option {
  label: string;
  value: string;
}

interface IProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "form"> {
  form: FieldValues;
  label: string;
  name: string;
  options: Option[];
  required?: boolean;
  selectSize?: "sm" | "default" | "large";
  triggerClsx?: string;
  variant?: "outline" | "faded" | "text-only";
  placeholder?: string;
}

const sizeClasses = {
  sm: "h-8 px-2 text-sm",
  default: "h-10 px-3 text-base",
  large: "h-12 text-base",
};

const variantClasses = {
  outline:
    "rounded-lg border border-input bg-background shadow-sm hover:bg-accent focus:ring-1 focus:ring-ring bg-transparent",
  faded:
    "rounded-lg text-foreground/80 hover:bg-muted/70 border border-muted/40 shadow-sm",
  "text-only":
    "border-none bg-transparent shadow-none p-0 font-normal group w-fit gap-1",
};

const FormSelectField: React.FC<IProps> = ({
  form,
  label,
  name,
  options,
  triggerClsx,
  required = false,
  variant = "outline",
  selectSize = "sm",
  placeholder = "Select an option",
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-1">
          <Text>
            {label}
            {required && (
              <Text variant="caption" color="danger" as="sup">
                &nbsp;*
              </Text>
            )}
          </Text>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={cn(
                  "!h-9 !text-base !rounded-sm !shadow-none w-full font-light !border-custom",
                  triggerClsx,
                  variantClasses[variant],
                  sizeClasses[selectSize]
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="border-custom mt-1">
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="!text-foreground text-sm text-light"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormSelectField;
