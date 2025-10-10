import React, { useCallback, useMemo, useState } from "react";

const generateStudents = () => {
  const data = [];
  for (let i = 1; i <= 1000; i++) {
    data.push({
      id: i,
      name: `student ${i}`,
      marks: Math.floor(Math.random() * 100),
    });
  }
  return data;
};

const Student = () => {
  const [students, setStudents] = useState(generateStudents);

  const handleIncrease = useCallback((id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, marks: s.marks + 1 } : s))
    );
  }, []);

  const { average, topper } = useMemo(() => {
    console.log("Recalculating average/topper...");
    if (students.length === 0) return { average: 0, topper: null };

    const total = students.reduce((sum, s) => sum + s.marks, 0);
    const avg = (total / students.length).toFixed(2);
    const top = students.reduce((max, s) => (s.marks > max.marks ? s : max));
    return { average: avg, topper: top.name };
  }, [students]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Student Marks Dashboard</h2>
      <p>
        <b>Average Marks:</b> {average} | <b>Topper:</b>
        {topper}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        {students.map((s) => (
          <li
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 10px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>
              {s.name} — Marks: {s.marks}
            </span>
            <button
              onClick={() => handleIncrease(s.id)}
               
            >
              + Increase
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Student;
