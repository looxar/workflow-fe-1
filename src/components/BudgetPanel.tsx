import { formatDecimal } from "@/lib/format-decimal";
import { BudgetRequest } from "@/models/budget-request";

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
  // Debugging output
  console.log("BudgetPanel items:", items);
  console.log("Is items an array?", Array.isArray(items));

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {budgetData.map((data) => (
        <BudgetCard key={data.title} title={data.title} value={data.value} />
      ))}
    </div>
  );
}

export default BudgetPanel;
