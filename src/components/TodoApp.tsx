import { ChangeEvent, useState } from "react";

interface Task {
  id: number;
  title: string;
}

function TodoApp() {
  const [items, setItems] = useState<Task[]>([]);
  // result , setter
  // A store at component 2
  const onAdd = (newItem: Task) => {
    setItems([...items, newItem]);
  };

  return (
    <div>
      <FormAdd onAdd={onAdd} />
      {/* <BudgetRequestList items={items} /> */}
    </div>
  );
}

function FormAdd({ onAdd }: { onAdd: (arg0: Task) => void }) {
  const [task, setTask] = useState<Task>({ id: 0, title: "" });
  const updateId = (event: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [event.target.name]: Number(event.target.value),
    });
  };
  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        id:
        <input type="number" name="id" onChange={updateId} />
      </div>
      <div>
        title:
        <input type="text" name="title" onChange={updateField} />
      </div>
      <button onClick={() => onAdd(task)}>Create</button>
    </div>
  );
}
