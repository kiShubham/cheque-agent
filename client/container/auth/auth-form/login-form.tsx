"use client";
import {
  loginFormConfig,
  loginFormSchema,
} from "@/config/form/login-form.config";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicForm } from "@/components/form/dynamicForm";
import { login } from "@/lib/auth-action";

export type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <DynamicForm
        form={form}
        onSubmit={login}
        config={loginFormConfig}
        submitButtonText="Continue ->"
        submitBtnClsx="w-full"
      />
    </div>
  );
};

export default LoginForm;
