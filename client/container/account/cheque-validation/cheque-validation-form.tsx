"use client";
import { DynamicForm } from "@/components/form/dynamicForm";
import Card from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import {
  chequeValidationFormConfig,
  chequeValidationSchema,
} from "@/config/form/cheque-valiation.config";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ChequeValidationFormType = z.infer<typeof chequeValidationSchema>;

const ChequeValidationForm = () => {
  const form = useForm<ChequeValidationFormType>({
    resolver: zodResolver(chequeValidationSchema),
  });

  const onSubmit = (data: ChequeValidationFormType) => {
    console.log(data);
  };

  const accountOptions = [
    { label: "Account 1", value: "account1" },
    { label: "Account 2", value: "account2" },
  ];

  return (
    <Card className="p-4 w-3xl" bordered>
      <DynamicForm
        form={form}
        onSubmit={onSubmit}
        config={chequeValidationFormConfig(accountOptions)}
        submitButtonText="submit cheque"
      />

      <Text>Extracted Data</Text>

      <Card className="bg-gray-50">
        {`{
            "date": "24/11/2023",
            "payee": "Anubhav",
            "amount_in_words": "fifty thousand rupees only",
            "amount_in_numbers": "50000",
            "bank_name": "State Bank Of India",
            "branch": "Najibabad, Bijnor District, Uttar Pradesh",
            "account_no": "88189598224",
            "cheque_no": "162648",
            "ifsc": "SBIN0000658",
            "signatories": "Ravi Kumar",
            "micr_cheque_number": "162648",
            "micr_account_number": "246002013",
            "branch_code": ""
        }`}
      </Card>
    </Card>
  );
};

export default ChequeValidationForm;
