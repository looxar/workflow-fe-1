import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../components/BudgetRequestDataTable";
import Header from "@/components/Header";
import { fetchBudgetItems } from "@/services/budget-item";

import { createBudgetAction } from "@/actions/create-budget-action";

type HomeProps = {
  searchParams: Params;
};

type Params = {
  errors?: string;
};

async function Home({ searchParams }: HomeProps) {
  const budgetRequests = await fetchBudgetItems();
  const errors = JSON.parse(searchParams?.errors ?? "{}");
  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests} />
        </div>
        <form action={createBudgetAction}>
          <div>
            Title:
            <input name="title" />
            <p className="text-red-500">{errors.title}</p>
          </div>
          <div>
            Price:
            <input name="price" type="number" />
            <p className="text-red-500">{errors.price}</p>
          </div>
          <button>Add</button>
        </form>
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

export default Home;
