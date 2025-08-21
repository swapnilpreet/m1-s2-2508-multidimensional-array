import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");

  const add = async () => {
    const t = text.trim();
    if (!t) return;
    await onAdd(t);
    setText("");
  };

  return (
    <div className="input-row">
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") add(); }}
      />
      <button className="primary" onClick={add}>Add</button>
    </div>
  );
}
