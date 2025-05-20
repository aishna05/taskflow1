# 📝 TaskFlow – Task Management with Time Tracking

**TaskFlow** is a lightweight and developer-friendly task management tool that combines productivity and time tracking into a simple interface. Ideal for solo developers, freelancers, and anyone looking to manage tasks and track how much time is spent on each one.

## 🚀 Features

### ✅ Add Tasks
- Add new tasks with:
  - Task name
  - Description
  - Deadline
  - Task is saved in `localStorage`

### ⏱️ Time Tracker
- Each task includes a built-in timer
  - Start, pause, resume, and stop the timer
  - Tracks time in real-time (minutes & seconds)
  - 
### 📋 Task List
- Displays all tasks in a clean list view
  - Task name
  - Deadline
  - Time spent (updated live)
  - Status
  - Timer controls

### 🏷️ Task Status
- Automatically updates task status based on timer:
  - `Pending`: Not started
  - `In Progress`: Timer is running
  - `Completed`: Timer stopped
- Manually update status if needed

### 🔍 Filter & Sort Tasks
- Filter tasks by:
  - Status (`Pending`, `In Progress`, `Completed`)
  - Deadline (upcoming, overdue)
  - Time spent (most to least)

## 🛠️ Tech Stack

- **React** – UI components and state management
- **Tailwind CSS** – Clean, modern UI styling
- **localStorage** – Persist task and time data
  
---

## 📦 Installation

1. Clone the repo:
   --bash
   git clone https://github.com/yourusername/taskflow.git

2. Install dependencies:
   --bash
   npm install
  
3. Run the development server:
   --bash
   npm start

## 🖼️ UI Preview

![image](https://github.com/user-attachments/assets/1a7532a0-10e2-4025-882f-fd9395acf6aa)


## 📁 Folder Structure

taskflow/
│
├── public/                  # Static assets
├── src/
│   ├── components/          # React components (TaskList, Timer, Filters, etc.)
│   ├── storage.js           # LocalStorage helper functions
│   ├── App.jsx              # Root component
│   ├── index.js             # Entry point
│
├── package.json
└── tailwind.config.js
```
