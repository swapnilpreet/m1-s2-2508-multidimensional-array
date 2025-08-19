import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, settasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task?.name.length < 3)
      return toast.error("A task must have more than 3 characters");
    if (task?.name.length > 100)
      return toast.error("A task must not be more than 100 characters");

    settasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task successfully Created");
    setTask({ id: "", name: "", status: "todo" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
        className="task-input"
        placeholder="Enter a task..."
      />
      <button className="add-btn">Add Task</button>
    </form>
  );
};

export default CreateTask;
