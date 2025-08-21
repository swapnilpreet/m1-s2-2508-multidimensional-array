export default function TaskItem({ task, selectedId, setSelectedId }) {
  const selected = selectedId === task._id;
  return (
    <div
      className={`item ${task.status} ${selected ? "selected" : ""}`}
      onClick={() => setSelectedId(task._id)}
    >
      <span>{task.text}</span>
      <span className="badge">{task.status}</span>
    </div>
  );
}
