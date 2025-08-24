"use client";
import ChequeValidationForm from "@/container/account/cheque-validation/cheque-validation-form";
import AccountTable from "@/container/account/existing-account-table";
import NewAccountForm from "@/container/account/new-account-form";
import LoginButton from "@/container/auth/loginlogoutbtn";
import UserGreetText from "@/container/new/greeting";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col py-8">
      <header className="flex justify-between py-8">
        <UserGreetText />
        <LoginButton />
      </header>
      <div className="flex justify-between">
        <NewAccountForm />
        <AccountTable />
      </div>
      <ChequeValidationForm />
    </div>
  );
}
