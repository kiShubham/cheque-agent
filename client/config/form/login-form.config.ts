import { FormSectionConfig } from "@/components/form/dynamicForm";
import { Mail, KeyRound } from "lucide-react";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const loginFormConfig: FormSectionConfig[] = [
  {
    fields: [
      {
        type: "text",
        label: "Email",
        name: "email",
        props: {
          placeholder: "Enter your email",
        },
        textInputIcon: Mail,
        fullWidth: true,
      },
      {
        type: "password",
        label: "Password",
        name: "password",
        props: {
          placeholder: "Enter your password",
        },
        textInputIcon: KeyRound,
        fullWidth: true,
      },
    ],
  },
];
