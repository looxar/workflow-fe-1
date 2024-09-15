"use client";
import { BudgetRequest } from "@/models/budget-request";
import React, { useState } from "react";

interface BudgetRequestContextProps {
    items: BudgetRequest[]
    getItem(_: number): BudgetRequest | undefined
    addItem(_: BudgetRequest): void
    updateItem(_: BudgetRequest): void
}

export const BudgetRequestContext = React.createContext<BudgetRequestContextProps>({
  items: [
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
  ],
  getItem(_: number) { return undefined },
  addItem(_: BudgetRequest) {},
  updateItem(_: BudgetRequest) {},
});

interface BudgetRequestContextProviderProps {
  children: React.ReactNode;
}

export function BudgetRequestContextProvider({
  children,
}: BudgetRequestContextProviderProps) {
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
  ]);

  const getItem = (id: number) => {
    return budgetRequests.find((item) => item.id == id);
  };

  const addItem = (newItem: BudgetRequest) => {
    setBudgetRequests([...budgetRequests, newItem]);
  };

  const updateItem = (updated: BudgetRequest) => {
    const newItems = budgetRequests.map((request) => {
      if (request.id === updated.id) {
        return updated;
      }
      return request;
    });
    setBudgetRequests(newItems);
  };

  return (
    <BudgetRequestContext.Provider
      value={{ items: budgetRequests, getItem, addItem, updateItem }}
    >
      {children}
    </BudgetRequestContext.Provider>
  );
}
