"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../../components/BudgetRequestDataTable";
import Header from "@/components/Header";
import { BudgetRequest } from "@/models/budget-request";
import FormAddRequest from "@/components/FormAddRequest";
import DoubleEffect from "@/components/DoubleEffect";
import CallAPI from "@/components/CallAPI";
import DemoUseEffect from "@/components/DemoUseEffect";
import Comp1 from "@/components/DemoContext";
import { title } from "process";

function Add() {
  // State variables to store form data
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBudget = { title, amount, quantity };
    console.log("New Budget:", newBudget);

    // Reset form fields
    setTitle("");
    setAmount("");
    setQuantity("");
  };

  // Function to handle change in input fields
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Add New Budget
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Budget
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Add;
