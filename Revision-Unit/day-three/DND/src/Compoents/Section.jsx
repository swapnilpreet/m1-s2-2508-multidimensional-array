import React from "react";
import TaskList from "./TaskList";
import toast from "react-hot-toast";
import { useDrop } from "react-dnd";
import Header from "./Header";

const Section = ({ status, tasks, settasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-red";
  let countbg = "count-red";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-yellow";
    countbg = "count-yellow";
    tasksToMap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    bg = "bg-green";
    countbg = "count-green";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    settasks((prev) => {
      const modifiedTasks = prev.map((t) =>
        t.id === id ? { ...t, status: status } : t
      );

      localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
      if (status === "todo") toast("Task Todo", { icon: "🤔" });
      if (status === "inprogress") toast("Task In Progress", { icon: "😯" });
      if (status === "closed") toast("Task Closed", { icon: "🥳" });
      return modifiedTasks;
    });
  };

  return (
    <div ref={drop} className={`section ${isOver ? "drop-hover" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap?.length} countbg={countbg} />
      {tasksToMap?.length > 0 &&
        tasksToMap?.map((task) => (
          <TaskList key={task.id} task={task} tasks={tasks} settasks={settasks} />
        ))}
    </div>
  );
};

export default Section;
