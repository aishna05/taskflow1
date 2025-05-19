 import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard"; 
import "./App.css"// Optional, or use <li> instead

function TaskList({ tasks, onAddTask }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2>Task List</h2>

      <ul>
        {tasks.length === 0 && <li>No tasks yet.</li>}
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} – {task.completed ? "✅ Done" : "🕒 In Progress"}
          </li>
        ))}
      </ul>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Task"}
      </button>

      {showForm && (
        <TaskForm
          onAddTask={(newTask) => {
            onAddTask(newTask); // Pass new task to parent (App.jsx)
            setShowForm(false); // Hide form after adding
          }}
        />
      )}
    </div>
  );
}

export default TaskList;