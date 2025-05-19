export const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export const getTasks = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}
export const clearTasks = () => {
    localStorage.removeItem("tasks");
}
export const updateTask = (taskId, updatedTask) => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        saveTasks(tasks);
    }
}
export const deleteTask = (taskId) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
}
export const addTask = (newTask) => {
    const tasks = getTasks();
    tasks.push({ ...newTask, startTime: null, endTime: null });
    saveTasks(tasks);
}
export const getTaskById = (taskId) => {
    const tasks = getTasks();
    return tasks.find(task => task.id === taskId);
}

export const getTasksByStatus = (status) => {
    const tasks = getTasks();
    return tasks.filter(task => task.status === status);
}

export const getTasksByPriority = (priority) => {
    const tasks = getTasks();
    return tasks.filter(task => task.priority === priority);
}
export const getTasksByDueDate = (dueDate) => {
    const tasks = getTasks();
    return tasks.filter(task => task.dueDate === dueDate);
}
export const getTasksByDateRange = (startDate, endDate) => {
    const tasks = getTasks();
    return tasks.filter(task => new Date(task.dueDate) >= new Date(startDate) && new Date(task.dueDate) <= new Date(endDate));
}
export const getTasksBySearch = (searchTerm) => {
    const tasks = getTasks();
    return tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));
}
