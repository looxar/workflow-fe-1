"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../components/BudgetRequestDataTable";
import Header from "@/components/Header";
import { BudgetRequest } from "@/models/budget-request";
import FormAddRequest from "@/components/FormAddRequest";

function Home() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([
    {
      id: 1,
      title: "Monitor",
      amount: 100,
      quantity: 1,
      status: "PENDING",
    },
    {
      id: 2,
      title: "Ram",
      amount: 200,
      quantity: 1,
      status: "APPROVED",
    },
    // {
    //   id: 3,
    //   title: "CPU",
    //   amount: 300,
    //   quantity: 1,
    //   status: "APPROVED",
    // },
  ]);
  const addRequest = (newRequest: BudgetRequest) => {
    setBudgetRequests([...budgetRequests, newRequest]);
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests} />
        </div>
        <FormAddRequest addRequest={addRequest} />
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

export default Home;
