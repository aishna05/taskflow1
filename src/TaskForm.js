import React, { useState , useEffect } from "react";
import "./App.css"

function TaskForm({ onAddTask , onSaveEdit, task, isEditing  }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("not started");

    useEffect(() => {
    if (isEditing && task) {
      setName(task.name || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setPriority(task.priority || "medium");
      setStatus(task.status || "not started");
    }
  }, [isEditing, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !dueDate) {
      alert("Please fill in all required fields");
      return;
    }

    const newTask = {
      id: isEditing ? task.id : crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      dueDate,
      priority,
      status,
      startTime: null,
      endTime: null,
    };
    if (isEditing && typeof onSaveEdit === "function") {
      onSaveEdit(newTask);
    } else if (typeof onAddTask === "function") {
      onAddTask(newTask);
    } else {
      console.error("No valid submit handler provided.");
    }

    onAddTask(newTask);

    // Reset form
    setName("");
    setDescription("");
    setDueDate("");
    setPriority("low");
    setStatus("not started");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label>
        Due Date:
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>

      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <button type="submit">
        Submit</button>
      <button
        type="reset"
        onClick={() => {
          setName("");
          setDescription("");
          setDueDate("");
          setPriority("low");
          setStatus("not started");
        }}
      >
        Reset
      </button>
    </form>
  );
}

export default TaskForm; 