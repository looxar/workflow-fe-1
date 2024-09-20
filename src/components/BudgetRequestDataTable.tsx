"use client"; // Ensure this component is treated as a client component

import { formatDecimal } from "@/lib/format-decimal";
import { BudgetRequest } from "@/models/budget-request";
import { Pencil } from "lucide-react";
import { useRouter } from 'next/navigation'; // Ensure correct import

interface BudgetRequestDataTableProps {
  items: BudgetRequest[];
}

function BudgetRequestDataTable({ items }: BudgetRequestDataTableProps) {
  const router = useRouter();

  const handleEdit = (id: number) => {
    // Navigate to the edit page with the id as a query parameter
    router.push(`/edit?id=${id}`);
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {items.map((request) => (
          <tr key={request.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                className="text-gray-600 hover:text-blue-600"
                onClick={() => handleEdit(request.id)}
              >
                <Pencil className="h-4 w-4" />
              </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">{request.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="font-bold">{request.title}</span> x {request.quantity} Units
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">{formatDecimal(request.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BudgetRequestDataTable;
