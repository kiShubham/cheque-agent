import { FormSectionConfig } from "@/components/form/dynamicForm";
import { User, CreditCard, IndianRupee } from "lucide-react";
import { z } from "zod";

export const bankAccountFormSchema = z.object({
  name: z.string().nonempty("Full name is required"),
  accountNumber: z
    .string()
    .nonempty("Account number is required")
    .regex(/^\d+$/, "Account number must contain only digits"),
  currentBalance: z
    .string()
    .min(0, "Current balance cannot be negative")
    .regex(/^\d+$/, "Account balance must contain only positive digits"),
  signature: z.any(),
});

export const bankAccountFormConfig: FormSectionConfig[] = [
  {
    title: "Account Details",
    fields: [
      {
        type: "text",
        label: "Full Name",
        name: "name",
        props: {
          placeholder: "Enter full name",
          required: true,
        },
        textInputIcon: User,
      },
      {
        type: "text",
        label: "Account Number",
        name: "accountNumber",
        props: {
          placeholder: "Enter account number",
          required: true,
        },
        textInputIcon: CreditCard,
      },
      {
        type: "text",
        label: "Current Balance",
        name: "currentBalance",
        props: {
          placeholder: "Enter current balance",
          required: true,
        },
        fullWidth: true,
        textInputIcon: IndianRupee,
      },
      {
        type: "upload",
        name: "signature",
        label: "Upload Signature",
        props: {
          required: true,
          allowedTypes: ["image/png", "image/jpeg"],
          uploadLabel: "upload signatures - jpg / png ; size < 5mb",
        },
        fullWidth: true,
      },
    ],
  },
];
