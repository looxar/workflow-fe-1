"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import { useBudget } from "@/components/BudgetContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/items";

function Edit() {
  const { addRequest } = useBudget();
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const id = searchParams.get("id"); // Get id from search params

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching item: ${response.statusText}`);
        }
        const data = await response.json();
        setTitle(data.title);
        setAmount(data.amount);
        setQuantity(data.quantity);
      } catch (error) {
        setMessage("Failed to load item data.");
        console.error("Error:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedBudget = {
      title,
      amount: Number(amount),
      quantity: Number(quantity),
    };

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBudget),
      });

      if (response.ok) {
        const data = await response.json();

        addRequest({
          ...data,
          id: data.id,
          status: "PENDING",
        });

        setMessage("Budget request updated successfully!");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setMessage("An error occurred while updating the budget request.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.back(); // Navigate to the previous page
    // or use router.push('/') to go to a specific route
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Edit Requirement
          </h1>

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
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Item"}
              </button>

              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleBack}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
