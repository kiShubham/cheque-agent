"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicForm } from "@/components/form/dynamicForm";
import {
  signupFormConfig,
  signupFormSchema,
} from "@/config/form/signup-form.config";
import { signup } from "@/lib/auth-action";

export type SignupFormData = z.infer<typeof signupFormSchema>;

const SignupForm = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div>
      <DynamicForm
        form={form}
        onSubmit={signup}
        config={signupFormConfig}
        submitButtonText="Continue ->"
        submitBtnClsx="w-full"
      />
    </div>
  );
};

export default SignupForm;
