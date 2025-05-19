import './App.css';
import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  saveTasks
} from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load tasks from storage on mount
  useEffect(() => {
    const stored = getTasks();
    setTasks(stored);
  }, []);

  // Filter + Search + Sort pipeline
  const getProcessedTasks = () => {
    let filtered = tasks;

    if (filter !== "all") {
      filtered = filtered.filter((task) => task.status === filter);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === "priority") {
      const order = { high: 1, medium: 2, low: 3 };
      filtered.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return filtered;
  };

  const handleAddTask = (newTask) => {
    const updated = [...tasks, newTask];
    setTasks(updated);
    addTask(newTask); // update storage
  };

  const handleDeleteTask = (taskId) => {
    const updated = tasks.filter((task) => task.id !== taskId);
    setTasks(updated);
    deleteTask(taskId);
  };

  const handleUpdateTask = (taskId, newStatus) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      let updated = { ...task, status: newStatus };

      if (newStatus === "in progress" && !task.startTime) {
        updated.startTime = Date.now();
      }

      if (newStatus === "completed" && !task.endTime) {
        updated.endTime = Date.now();
      }

      return updated;
    }
    return task;
  });

  setTasks(updatedTasks);
};

  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedTask) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
    updateTask(updatedTask.id, updatedTask);
    setIsModalOpen(false);
  };
  const filteredTasks = tasks.filter((task) => {
    const matchStatus = filter === "all" || task.status === filter;
    const matchSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "priority") {
      const order = { high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    }
    return 0;
  });

  

  return (
    <div className="app-container">
      <h1>📋 TaskFlow</h1>

      {/* Task Form */}
      {!isModalOpen && <TaskForm onAddTask={handleAddTask} />}

      {/* Filter & Search */}
      <div style={{ margin: "1rem 0" }}>
        <label>Status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label>Sort: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
        
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Task Form for Editing (Modal style) */}
  {isModalOpen && (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem", background: "#f0f0f0" }}>
      <h3>Edit Task</h3>
      <TaskForm
        isEditing={true}
        task={taskToEdit}
        onSaveEdit={handleSaveEdit}
      />
      <button onClick={() => setIsModalOpen(false)}>Cancel</button>
    </div>
  )}

      {/* Task List */}
  <h2>Tasks</h2>
  {sortedTasks.length === 0 ? (
    <p>No tasks added yet.</p>
  ) : (
    sortedTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onUpdate={handleUpdateTask}
      />
    ))
  )}
    </div>
  );
}

export default App;