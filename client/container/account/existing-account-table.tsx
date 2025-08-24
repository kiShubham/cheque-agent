"use client";

import React from "react";
import { CustomTable } from "@/components/common/c-table";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

interface IAccountTable {
  holder: string;
  balance: string;
  number: string;
  signature: string;
}

const accountTableCol = [
  {
    title: "Account Holder",
    key: "holder",
    render: (record: IAccountTable) => <span>{record.holder}</span>,
  },
  {
    title: "Account Balance",
    key: "balance",
    render: (record: IAccountTable) => <span>{record.balance}</span>,
  },
  {
    title: "Account Number",
    key: "number",
    render: (record: IAccountTable) => <span>{record.number}</span>,
  },
  {
    title: "Signature Link",
    key: "signature",
    render: (record: IAccountTable) => (
      <a href={record.signature} target="_blank" rel="noopener noreferrer">
        <Button size="sm" variant="link">
          View Signature
        </Button>
      </a>
    ),
  },
];

export default function AccountTable() {
  return (
    <Card className="p-4 w-3xl" bordered>
      <CustomTable<IAccountTable>
        loading={false}
        dataSource={accountData}
        columns={accountTableCol}
      />
    </Card>
  );
}

const accountData: IAccountTable[] = [
  {
    holder: "John Doe",
    balance: "$5,000.00",
    number: "1234567890",
    signature: "https://via.placeholder.com/100x40?text=Sign1",
  },
  {
    holder: "Jane Smith",
    balance: "$12,300.75",
    number: "9876543210",
    signature: "https://via.placeholder.com/100x40?text=Sign2",
  },
  {
    holder: "Alice Johnson",
    balance: "$7,850.50",
    number: "1111222233",
    signature: "https://via.placeholder.com/100x40?text=Sign3",
  },
];
