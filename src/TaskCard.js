import React from "react";
import Timer from "./Timer.js";
import { getTimeSpent } from "./Timer.js";
import "./App.css" // Assuming getTimeSpent is exported from Timer.jsx

function TaskCard({ task, onEditTask, onDeleteTask, onUpdate }) {
  const handleEdit = () => {
    onEditTask(task.id);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    onUpdate(task.id, { ...task, status: updatedStatus });
  };
 
  return (
    <div className="tcontainer">
    <div className="task-card">
      <h3>{task.name}</h3>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Time Spent:</strong> {getTimeSpent(task)}</p>


      <label>
        <strong>Status:</strong>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>



      <button onClick={handleEdit}>Edit</button>
      <button  style={{margin : "10px"}} onClick={handleDelete}>Delete</button>

     <div style={{ marginTop: "10px" }}>
        <Timer task={task} />
      </div>
    </div>
    </div>
  );
}

export default TaskCard; 