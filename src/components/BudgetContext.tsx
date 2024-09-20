"use client";
// context/BudgetContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { BudgetRequest } from "@/models/budget-request";

interface BudgetContextProps {
  budgetRequests: BudgetRequest[];
  addRequest: (newRequest: BudgetRequest) => void;
}

const BudgetContext = createContext<BudgetContextProps | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);

  const addRequest = (newRequest: BudgetRequest) => {
    setBudgetRequests((prevRequests) => [
      ...prevRequests,
      { ...newRequest, id: prevRequests.length + 1 },
    ]);
  };

  return (
    <BudgetContext.Provider value={{ budgetRequests, addRequest }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
