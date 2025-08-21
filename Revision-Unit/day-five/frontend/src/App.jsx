import { useEffect, useMemo, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskInput from "./components/TaskInput.jsx";
import TaskColumn from "./components/TaskColumn.jsx";
import { fetchTasks, addTask, updateTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const pending = useMemo(() => tasks.filter(t => t.status === "pending").sort((a,b)=>a.order-b.order || a.createdAt.localeCompare(b.createdAt)), [tasks]);
  const completed = useMemo(() => tasks.filter(t => t.status === "completed"), [tasks]);
  
  useEffect(() => {
    (async () => {
      const data = await fetchTasks();
      setTasks(data);
    })();
  }, []);

  const reload = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleAdd = async (text) => {
    await addTask(text);
    await reload();
  };
  const moveSelected = async (targetStatus) => {
    if (!selectedId) return;
    const found = tasks.find(t => t._id === selectedId);
    if (!found) return;
    if (found.status === targetStatus) return;
    if (targetStatus === "pending") {
      const lastOrder = pending.length ? Math.max(...pending.map(t => t.order)) : -1;
      await updateTask(found._id, { status: "pending", order: lastOrder + 1 });
    } else {
      await updateTask(found._id, { status: "completed" });
    }
    await reload();
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceList = source.droppableId;
    const destList = destination.droppableId;

    const movedTask = tasks.find(t => t._id === draggableId);
    if (!movedTask) return;
    if (sourceList === "pending" && destList === "pending") {
      const newPending = Array.from(pending);
      const [removed] = newPending.splice(source.index, 1);
      newPending.splice(destination.index, 0, removed);
      for (let i = 0; i < newPending.length; i++) {
        const t = newPending[i];
        if (t.order !== i) {
          await updateTask(t._id, { order: i });
        }
      }
      await reload();
      return;
    }
    if (sourceList !== destList) {
      if (destList === "pending") {
        const newPending = Array.from(pending);
        const lastOrder = newPending.length ? Math.max(...newPending.map(t => t.order)) : -1;
        const nextArr = Array.from(newPending);
        const clone = { ...movedTask, status: "pending" };
        nextArr.splice(destination.index, 0, clone);
        for (let i = 0; i < nextArr.length; i++) {
          await updateTask(nextArr[i]._id === movedTask._id ? movedTask._id : nextArr[i]._id, { status: "pending", order: i });
        }
      } else {
        await updateTask(movedTask._id, { status: "completed" });
      }
      await reload();
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskInput onAdd={handleAdd} />

      <div className="grid">
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskColumn
            droppableId="pending"
            title="Pending Tasks"
            tasks={pending}
            allowReorder={true}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />

          <div className="middle-controls">
            <button onClick={() => moveSelected("completed")}>➡</button>
            <button onClick={() => moveSelected("pending")}>⬅</button>
          </div>

          <TaskColumn
            droppableId="completed"
            title="Completed Tasks"
            tasks={completed}
            allowReorder={false}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </DragDropContext>
      </div>
    </div>
  );
}
