type A = string;

function ObjectRender() {
  const task = {
    title: "เบิกงบ",
    amount: 20,
  };
  return (
    <div>
      <h1>Task: {task.title}</h1>
      <p>${task.amount}</p>
    </div>
  );
}

export function Primitive() {
  return <div>primitive</div>;
}

export const name = "xxx";
export const age = "xxx";
const title = "xxx";

export default ObjectRender;
