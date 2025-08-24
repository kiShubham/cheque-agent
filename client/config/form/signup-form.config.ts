import { FormSectionConfig } from "@/components/form/dynamicForm";
import { Mail, KeyRound, User } from "lucide-react";
import { z } from "zod";

// Zod schema for signup form validation
export const signupFormSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signupFormConfig: FormSectionConfig[] = [
  {
    fields: [
      {
        type: "text",
        label: "First Name",
        name: "firstName",
        props: {
          placeholder: "First name",
        },
      },
      {
        type: "text",
        label: "Last Name",
        name: "lastName",
        props: {
          placeholder: "Last name",
        },
      },
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
          placeholder: "Create a password",
        },
        textInputIcon: KeyRound,
        fullWidth: true,
      },
    ],
  },
];
