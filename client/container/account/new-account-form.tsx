"use client";
import { DynamicForm } from "@/components/form/dynamicForm";
import Card from "@/components/ui/card";
import {
  bankAccountFormConfig,
  bankAccountFormSchema,
} from "@/config/form/account-form.config";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type NewAccountFormType = z.infer<typeof bankAccountFormSchema>;

const NewAccountForm = () => {
  const form = useForm<NewAccountFormType>({
    resolver: zodResolver(bankAccountFormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: NewAccountFormType) => {
    console.log(data);
  };

  return (
    <Card bordered className="w-xl">
      <DynamicForm
        form={form}
        onSubmit={onSubmit}
        config={bankAccountFormConfig}
        submitButtonText="Continue ->"
        submitBtnClsx="w-full"
      />
    </Card>
  );
};

export default NewAccountForm;
