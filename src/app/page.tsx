"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../components/BudgetRequestDataTable";
import Header from "@/components/Header";
import { BudgetRequest } from "@/models/budget-request";
import FormAddRequest from "@/components/FormAddRequest";
import DoubleEffect from "@/components/DoubleEffect";
import CallAPI from "@/components/CallAPI";
import DemoUseEffect from "@/components/DemoUseEffect";
import Comp1 from "@/components/DemoContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

function Home() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const [newRequest, setNewRequest] = useState<BudgetRequest>({
    id: 0,
    title: "",
    amount: 0,
    quantity: 1,
    status: "APPROVED",
  });

  const addRequest = (newRequest: BudgetRequest) => {
    // Add the new request and sort by id
    setBudgetRequests((prevRequests) => {
      const updatedRequests = [...prevRequests, newRequest];
      return updatedRequests.sort((a: BudgetRequest, b: BudgetRequest) => a.id - b.id); // Explicitly type a and b
    });
  };

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
    addRequest({
      ...newRequest,
      id: budgetRequests.length + 1,
    });
    setNewRequest({
      id: 0,
      title: "",
      amount: 0,
      quantity: 1,
      status: "APPROVED",
    });
  };


  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            // Set and sort the budget requests by id
            const sortedData = data.data.sort(
              (a: BudgetRequest, b: BudgetRequest) => a.id - b.id
            );
            setBudgetRequests(sortedData);
          } else {
            console.error('Fetched data is not an array:', data.data);
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      console.error('API URL is not defined');
    }
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests} />
        </div>
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

export default Home;
