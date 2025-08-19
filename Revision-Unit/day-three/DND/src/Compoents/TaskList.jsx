import React from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

const TaskList = ({ task, tasks, settasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filtered));
    settasks(filtered);
    toast("Task Removed", { icon: "👻" });
  };

  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? "dragging" : ""}`}
    >
      <p>{task.name}</p>
      <button className="delete-btn" onClick={() => handleRemove(task.id)}>
        ✖
      </button>
    </div>
  );
};

export default TaskList;
