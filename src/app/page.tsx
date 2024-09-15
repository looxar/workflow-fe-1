"use client";

import { ChangeEvent, FormEvent, useContext, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../components/BudgetRequestDataTable";
import Header from "@/components/Header";
import { BudgetRequest } from "@/models/budget-request";
import { BudgetRequestContext } from "./contexts/BudgetRequestContext";

let nextId = 3;
function Home() {
  const { items, addItem } = useContext(BudgetRequestContext);
  const budgetRequests = items;

  const [newRequest, setNewRequest] = useState<BudgetRequest>({
    id: 0,
    title: "",
    amount: 0,
    quantity: 1,
    status: "APPROVED",
  });

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "number"
        ? Number(event.target.value)
        : event.target.value;
    setNewRequest({
      ...newRequest,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addItem({
      id: nextId++,
      title: newRequest.title,
      amount: newRequest.amount,
      quantity: 1,
      status: "APPROVED",
    });
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests} />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            Title:
            <input
              name="title"
              value={newRequest.title}
              onChange={updateField}
            />
          </div>
          <div>
            Amount:
            <input
              name="amount"
              type="number"
              value={newRequest.amount}
              onChange={updateField}
            />
          </div>
          <button>Add</button>
        </form>
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

export default Home;
