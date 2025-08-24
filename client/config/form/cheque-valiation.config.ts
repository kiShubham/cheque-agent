import { FormSectionConfig } from "@/components/form/dynamicForm";
import { z } from "zod";

export const chequeValidationSchema = z.object({
  accountNumber: z.string(),
  cheque: z.any(),
});

interface Option {
  label: string;
  value: string;
}

export const chequeValidationFormConfig = (
  account_number_options: Option[]
): FormSectionConfig[] => {
  return [
    {
      title: "Cheque Validation form",
      fields: [
        {
          type: "select",
          label: "Account number",
          name: "account_number",
          options: account_number_options,
          props: {
            placeholder: "select account number",
          },
        },
        {
          type: "upload",
          name: "cheque",
          label: "Upload cheque",
          props: {
            required: true,
            allowedTypes: ["image/png", "image/jpeg"],
            uploadLabel: "upload signatures - jpg / png ; size < 7mb",
            max_file_size_mb: 7,
          },
          fullWidth: true,
        },
      ],
    },
  ];
};
