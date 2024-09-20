"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../../components/ApprovalRequestDataTable";
import Header from "@/components/Header";
import { BudgetRequest } from "@/models/budget-request";
import FormAddRequest from "@/components/FormAddRequest";
import DoubleEffect from "@/components/DoubleEffect";
import CallAPI from "@/components/CallAPI";
import DemoUseEffect from "@/components/DemoUseEffect";
import Comp1 from "@/components/DemoContext";
import ApprovalRequestDataTable from "@/components/ApprovalRequestDataTable";
import { useBudget } from "@/components/BudgetContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

function ApprovalPage() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from the API
  const fetchBudgetRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (Array.isArray(data.data)) {
        const filteredData = data.data
          .filter((item: BudgetRequest) => item.status === "PENDING") // Only show PENDING items
          .sort((a: BudgetRequest, b: BudgetRequest) => a.id - b.id); // Sort by ID
        setBudgetRequests(filteredData);
      } else {
        console.error("Fetched data is not an array:", data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchBudgetRequests();
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Approval Requests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ApprovalRequestDataTable
            items={budgetRequests}
            onActionComplete={fetchBudgetRequests} // Pass the function to refresh data
          />
        )}
      </main>
    </div>
  );
}

export default ApprovalPage;
