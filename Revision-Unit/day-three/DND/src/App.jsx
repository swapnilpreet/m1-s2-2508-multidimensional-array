import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";

import "./App.css";
import CreateTask from "./Compoents/CreateTask";
import ListOfTask from "./Compoents/ListOfTask";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <h1 className="title">📋 Task Board</h1>
        <CreateTask tasks={tasks} settasks={setTasks} />
        <ListOfTask tasks={tasks} settasks={setTasks} />
        <Toaster position="top-center" />
      </div>
    </DndProvider>
  );
}

export default App;
