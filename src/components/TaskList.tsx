"use client";
import { useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState(["งานที่ 1", "งานที่ 2"]); // Initial tasks
  const [newTask, setNewTask] = useState(""); // State for the new task input

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear the input field after adding the task
    }
  };

  const handleRemoveTask = (taskToRemove: string) => {
    setTasks(tasks.filter((task) => task !== taskToRemove));
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task, count) => (
          <li key={task}>
            {task}{" "}
            <button onClick={() => handleRemoveTask(task)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task (in Thai)"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default TaskList;
