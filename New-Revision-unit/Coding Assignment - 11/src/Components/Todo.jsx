import React, { useCallback, useMemo, useState } from "react";

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        padding: "6px 10px",
      }}
    >
      <span>{todo.text}</span>

      <div>
        <button onClick={()=>onToggle(todo.id)}>
          {todo.completed ?"Done":"Mark as Done"}
        </button>

        <button onClick={()=>onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
});

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = useCallback(() => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  }, [newTodo]);

  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev)=>prev.filter((t)=>t.id!== id));
  }, []);

  const stats = useMemo(()=>{
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [todos]);

  return (
    <div>
      <h2>Todo List with Stats</h2>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <p>
        <b>Total:</b> {stats.total} <b>Completed:</b> {stats.completed}{" "}
        <b>Pending:</b> {stats.pending}
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
