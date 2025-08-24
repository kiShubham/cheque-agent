"use client";

import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues } from "react-hook-form";
import { FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

interface IProps {
  form: FieldValues;
  name: string;
  label?: string | null;
  required?: boolean;
  max_file_size_mb?: number;
  allowedTypes?: string[];
  uploadLabel?: string;
}

const size = 5;
const Types = ["application/pdf", "image/png", "image/jpeg"];

export const FormUploadInput: React.FC<IProps> = ({
  form,
  name,
  label,
  required,
  uploadLabel,
  allowedTypes: ALLOWED_TYPES = Types,
  max_file_size_mb: MAX_FILE_SIZE_MB = size,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const validateFiles = (incoming: File[]): File[] => {
    const valid: File[] = [];

    for (const file of incoming) {
      const fileSizeMB = file.size / 1024 / 1024;

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`${file.name} is not a supported file type.`);
        continue;
      }

      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`${file.name} exceeds the 5MB limit.`);
        continue;
      }

      valid.push(file);
    }

    return valid;
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(false);
          setError(null);
          const droppedFiles = Array.from(e.dataTransfer.files);
          const validFiles = validateFiles(droppedFiles);
          field.onChange([...(field.value || []), ...validFiles]);
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setError(null);
          const fileList = e.target.files;
          if (fileList) {
            const selectedFiles = Array.from(fileList);
            const validFiles = validateFiles(selectedFiles);
            field.onChange([...(field.value || []), ...validFiles]);
          }
        };

        const handleRemoveFile = (indexToRemove: number) => {
          const newFiles = [...(field.value || [])];
          newFiles.splice(indexToRemove, 1);
          field.onChange(newFiles);
        };

        return (
          <FormItem className="gap-1">
            <Text hidden={!label}>
              {label}
              {required ? (
                <Text variant="caption" color="danger" as="sup">
                  {" "}
                  *
                </Text>
              ) : null}
            </Text>

            <FormControl>
              <div
                className={cn(
                  "h-[4.3rem] flex items-center justify-center gap-2 border-1 border-dashed border-primary rounded-md cursor-pointer transition",
                  isDragging && "bg-primary/10 scale-105",
                  "hover:bg-primary/10"
                )}
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
              >
                <Text color="primary" weight={"light"}>
                  {uploadLabel ?? "Upload"}
                </Text>
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </FormControl>

            {(error || form.formState.errors[name]?.message) && (
              <FormMessage className="text-xs text-red-500">
                {error ?? String(form.formState.errors[name]?.message)}
              </FormMessage>
            )}

            {(field.value?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {field.value.map((file: File, index: number) => (
                  <Card
                    key={index}
                    variant="modal"
                    className="w-fit flex-wrap flex items-center gap-2.5"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="shrink-0" strokeWidth={1} />
                      <div className="truncate">
                        <Text
                          weight="light"
                          className="truncate"
                          title={file.name}
                          as="span"
                        >
                          {file.name}
                        </Text>
                        <Text
                          variant="caption"
                          color="muted"
                          className="truncate"
                        >
                          {(file.size / 1024).toFixed(0)} KB – {file.type}
                        </Text>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveFile(index)}
                      aria-label="Remove file"
                      className="ml-auto mb-auto"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </FormItem>
        );
      }}
    />
  );
};
