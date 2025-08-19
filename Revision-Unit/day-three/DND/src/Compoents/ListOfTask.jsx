import React, { useEffect, useState } from "react";
import Section from "./Section";

const ListOfTask = ({ tasks, settasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    setTodos(tasks.filter((task) => task.status === "todo"));
    setInProgress(tasks.filter((task) => task.status === "inprogress"));
    setClosed(tasks.filter((task) => task.status === "closed"));
  }, [tasks]);

  const statusTabs = ["todo", "inprogress", "closed"];

  return (
    <div className="board">
      {statusTabs.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          settasks={settasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListOfTask;
