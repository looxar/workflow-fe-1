"use client"; // Ensure this component is treated as a client component

import { formatDecimal } from "@/lib/format-decimal";
import { BudgetRequest } from "@/models/budget-request";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation"; // Ensure correct import
import { useState } from "react";

interface ApprovalRequestDataTableProps {
  items: BudgetRequest[];
  onActionComplete: () => void; // Callback to re-fetch data
}

function ApprovalRequestDataTable({ items, onActionComplete }: ApprovalRequestDataTableProps) {
    const [updatingId, setUpdatingId] = useState<number | null>(null);
  
    const updateStatus = async (id: number, newStatus: "APPROVED" | "REJECTED") => {
      try {
        setUpdatingId(id); // Set the updating state to show loading indicator, if needed
  
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`;
        
        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });
  
        if (response.ok) {
          console.log(`Successfully updated item with ID: ${id} to status: ${newStatus}`);
          onActionComplete(); // Trigger data re-fetch after successful update
        } else {
          console.error(`Failed to update item with ID: ${id}`);
        }
      } catch (error) {
        console.error("Error updating status:", error);
      } finally {
        setUpdatingId(null);
      }
    };

  return (
    <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {items.map((request) => (
        <tr key={request.id}>
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <div className="flex items-center space-x-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                onClick={() => updateStatus(request.id, "APPROVED")}
                disabled={updatingId === request.id} // Disable button if updating
              >
                {updatingId === request.id ? "Approving..." : "Approve"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                onClick={() => updateStatus(request.id, "REJECTED")}
                disabled={updatingId === request.id} // Disable button if updating
              >
                {updatingId === request.id ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right">{request.id}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="font-bold">{request.title}</span> x {request.quantity} Units
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right">{request.amount}</td>
          <td className="px-6 py-4 whitespace-nowrap text-right">{request.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
}

export default ApprovalRequestDataTable;
