"use client"; // Ensure this component is treated as a client component

import { formatDecimal } from "@/lib/format-decimal";
import { BudgetRequest } from "@/models/budget-request";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface BudgetCardProps {
  title: string;
  value: number;
}

function BudgetCard({ title, value }: BudgetCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-center">
        {title}: {formatDecimal(value)}
      </p>
    </div>
  );
}

interface BudgetPanelProps {
  items: BudgetRequest[];
}

function BudgetPanel({ items }: BudgetPanelProps) {
  const router = useRouter(); // Initialize the router for navigation

  // Ensure items is an array before processing
  if (!Array.isArray(items)) {
    return <div>Error: items is not an array</div>;
  }

  const total = 10_000;
  const usedBudget = items
    .filter((request) => request.status === "APPROVED")
    .map((request) => request.amount)
    .reduce((sum, amount) => sum + amount, 0);

  const budgetData = [
    { title: "Total Budget", value: total },
    { title: "Used Budget", value: usedBudget },
    { title: "Balance", value: total - usedBudget },
  ];

  const handleAddButtonClick = () => {
    router.push("/add"); // Navigate to the add page
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {budgetData.map((data) => (
        <BudgetCard key={data.title} title={data.title} value={data.value} />
      ))}
      {/* Add the button below the "Total Budget" card (second row), left-aligned */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleAddButtonClick}
        >
          Add New Budget
        </button>
      </div>
    </div>
  );
}

export default BudgetPanel;
