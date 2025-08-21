import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem.jsx";

export default function TaskColumn({
  droppableId,
  title,
  tasks,
  allowReorder,
  selectedId,
  setSelectedId
}) {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={droppableId} isDropDisabled={false} isCombineEnabled={false} direction="vertical">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className="list"
            {...provided.droppableProps}
          >
            {tasks.map((t, index) => (
              <Draggable
                key={t._id}
                draggableId={t._id}
                index={allowReorder ? index : 0} // index required; we still allow cross-drop
                isDragDisabled={!allowReorder && t.status !== "pending"} // only pending column reorders
              >
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <TaskItem task={t} selectedId={selectedId} setSelectedId={setSelectedId} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
