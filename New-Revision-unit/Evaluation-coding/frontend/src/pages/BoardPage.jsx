import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import socket from "../utils/socket";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/board.css";

export default function BoardPage() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [tasksByColumn, setTasksByColumn] = useState({});
  const [columns, setColumns] = useState([]);
  const [pageMap, setPageMap] = useState({});

  useEffect(() => {
    fetchBoard();
    socket.connect();
    socket.emit("joinBoard", boardId);
    socket.on("boardUpdate", (payload) => {
      // naive approach: refetch tasks for changed column
      fetchTasksForAllColumns();
    });
    return () => {
      socket.emit("leaveBoard", boardId);
      socket.disconnect();
    };
  }, []);

  const fetchBoard = async () => {
    const res = await API.get(`/boards/${boardId}`);
    setBoard(res.data);
    setColumns(res.data.columns);
    fetchTasksForAllColumns(res.data.columns);
  };

  const fetchTasksForAllColumns = async (cols = columns) => {
    const map = {};
    for (const col of cols) {
      const res = await API.get(`/tasks/${boardId}`, {
        params: { columnId: col._id, page: 1, limit: 10 },
      });
      map[col._id] = res.data;
    }
    setTasksByColumn(map);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    // optimistic UI: move locally
    const srcCol = source.droppableId;
    const destCol = destination.droppableId;
    if (srcCol === destCol && source.index === destination.index) return;
    // call API to move
    try {
      await API.post(`/tasks/move/${draggableId}`, {
        destColumnId: destCol,
        destOrder: destination.index,
      });
      socket.emit("boardAction", {
        boardId,
        type: "taskMoved",
        taskId: draggableId,
        from: srcCol,
        to: destCol,
      });
      // refresh
      fetchTasksForAllColumns();
    } catch (err) {
      console.error(err);
    }
  };

  if (!board) return <div>Loading...</div>;

  return (
    <div className="board-page">
      <h2>{board.title}</h2>
      <div className="columns">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((col) => (
            <Droppable droppableId={col._id} key={col._id}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{col.title}</h3>
                  <div className="tasks">
                    {(tasksByColumn[col._id]?.tasks || []).map((task, idx) => (
                      <Draggable
                        draggableId={task._id}
                        index={idx}
                        key={task._id}
                      >
                        {(p) => (
                          <div
                            className="task-card"
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                          >
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                            <small>
                              Assigned: {task.assignedTo?.name || "Unassigned"}
                            </small>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
