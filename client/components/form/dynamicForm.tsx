import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

import FormTextInput from "./text-input";
import FormPasswordInput from "./password-input";
import FormSelectField from "./select-input";
import FormTextAreaInput from "./text-area-input";
import { Loader, LucideIcon } from "lucide-react";
import { FormUploadInput } from "./upload-input";

interface FieldConfig {
  type: "text" | "select" | "password" | "textarea" | "upload";
  label: string;
  name: string;
  options?: { label: string; value: string }[];
  props?: Record<string, unknown>;
  fullWidth?: boolean;
  textInputIcon?: LucideIcon;
}

export interface FormSectionConfig {
  title?: string;
  fields: FieldConfig[];
}

interface Props<TFormValues extends Record<string, unknown>> {
  form: UseFormReturn<TFormValues>;
  onSubmit: (data: TFormValues) => void;
  config: FormSectionConfig[];
  submitButtonText?: string;
  CancelButtonText?: string;
  submitBtnLoading?: boolean;
  showCancelBtn?: boolean;
  onCancelClick?: () => void;
  submitBtnClsx?: string;
}

export function DynamicForm<TFormValues extends Record<string, unknown>>({
  form,
  onSubmit,
  onCancelClick,
  config,
  submitBtnLoading,
  showCancelBtn = false,
  submitButtonText = "Submit",
  submitBtnClsx = "",
  CancelButtonText = "Cancel",
}: Props<TFormValues>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {config.map((section, idx) => (
          <div key={idx} className="space-y-6">
            {section.title && <Text variant="subheading">{section.title}</Text>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.fields.map((field) => {
                const fieldProps = {
                  form: { ...form },
                  label: field.label,
                  name: field.name,
                  ...field.props,
                };

                const fieldComponent = (() => {
                  switch (field.type) {
                    case "text":
                      return (
                        <FormTextInput
                          {...fieldProps}
                          variant="outline"
                          icon={
                            field.textInputIcon ? (
                              <field.textInputIcon
                                strokeWidth={1}
                                className="size-4 cursor-auto"
                              />
                            ) : undefined
                          }
                        />
                      );
                    case "password":
                      return (
                        <FormPasswordInput {...fieldProps} variant="outline" />
                      );
                    case "select":
                      return (
                        <FormSelectField
                          options={field.options || []}
                          {...fieldProps}
                        />
                      );
                    case "textarea":
                      return (
                        <FormTextAreaInput
                          {...fieldProps}
                          variant={"outline"}
                        />
                      );
                    case "upload":
                      return <FormUploadInput {...fieldProps} label={null} />;
                    default:
                      return null;
                  }
                })();

                return (
                  <div
                    key={field.name}
                    className={cn(field.fullWidth && "sm:col-span-2")}
                  >
                    {fieldComponent}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-2">
          {showCancelBtn && (
            <Button type="button" variant={"outline"} onClick={onCancelClick}>
              {CancelButtonText}
            </Button>
          )}

          <Button
            type="submit"
            disabled={submitBtnLoading}
            className={cn("min-w-20", submitBtnClsx)}
          >
            {submitBtnLoading && <Loader className="animate-spin" />}
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
