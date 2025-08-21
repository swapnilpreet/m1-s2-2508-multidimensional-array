import axios from "axios";

// Update if your backend port differs
export const API = axios.create({
  baseURL: "http://localhost:5000"
});

// API helpers
export const fetchTasks = () => API.get("/tasks").then(r => r.data);
export const addTask = (text) => API.post("/tasks", { text }).then(r => r.data);
export const updateTask = (id, payload) => API.put(`/tasks/${id}`, payload).then(r => r.data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`).then(r => r.data);
