import React, { useState } from "react";

function InputBox({ inputData, onAddSub }) {
  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Type something"
        value={inputData.text}
        onChange={(e) => (inputData.text = e.target.value)}
      />
      <button onClick={() => onAddSub(inputData.id)}>Add Sub Input</button>
      <div style={{ marginLeft: "20px" }}>
        {inputData.children.map((child) => (
          <InputBox key={child.id} inputData={child} onAddSub={onAddSub} />
        ))}
      </div>
    </div>
  );
}

function NestedInputPage({ goBack }) {
  const [allInputs, setAllInputs] = useState([]);
  const makeInput = () => ({
    id: Date.now() + Math.random(),
    text: "",
    children: [],
  });
  const addMainInput = () => {
    setAllInputs([...allInputs, makeInput()]);
  };

  const addSubInput = (id) => {
    const addChild = (nodes) =>
      nodes.map((n) => {
        if (n.id === id) {
          return { ...n, children: [...n.children, makeInput()] };
        }
        return { ...n, children: addChild(n.children) };
      });
    setAllInputs(addChild(allInputs));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nested Input Builder</h1>
      <button onClick={addMainInput}>Add Input</button>
      <button style={{ marginLeft: "10px" }} onClick={goBack}>
        Go Back Home
      </button>

      <div style={{ marginTop: "20px" }}>
        {allInputs.map((inp) => (
          <InputBox key={inp.id} inputData={inp} onAddSub={addSubInput} />
        ))}
      </div>
    </div>
  );
}

export default NestedInputPage;
