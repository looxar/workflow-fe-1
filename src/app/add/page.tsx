// app/add/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useBudget } from "@/components/BudgetContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/items";

function Add() {
  const { addRequest } = useBudget(); // Access addRequest from context
  const router = useRouter(); // Initialize the router hook

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [loading, setLoading] = useState(false); // For loading state
  const [message, setMessage] = useState(""); // For success/error messages

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the data to send
    const newBudget = {
      title,
      amount: Number(amount),
      quantity: Number(quantity),
    };

    try {
      setLoading(true);
      setMessage("");

      // Send POST request to backend
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBudget),
      });

      if (response.ok) {
        const data = await response.json();

        // Add the new request to context state (or use a refetch strategy)
        addRequest({
          ...data, // Use returned data to ensure consistency with the backend
          id: data.id, // Assuming backend returns an ID
          status: "APPROVED", // Set status as required
        });

        // Reset form fields
        setTitle("");
        setAmount("");
        setQuantity("");

        // Set success message
        setMessage("Budget request added successfully!");
        // Redirect to the main page after 2 seconds
        setTimeout(() => {
          router.push("/"); // Replace "/" with your main page route if different
        }, 2000);
      } else {
        // Handle error responses
        setMessage(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setMessage("An error occurred while adding the budget request.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Add New Budget</h1>

          {/* Display message */}
          {message && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                message.includes("success") ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setQuantity(Number(e.target.value))}
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
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Budget"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
