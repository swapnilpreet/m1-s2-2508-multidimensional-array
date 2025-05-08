import React, { useState } from 'react';

function App() {
  let [count,setCount]=useState(0);

  const changeTitleVanilla = () => {
    document.title = "Vanilla JS.";
    setCount(count+1)
  };
  const changeTitleReact = () => {
    document.title = "React JS";
    setCount(count+1)
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Virtual DOM vs Traditional DOM</h1>
      <p>number of time DOM updates.{count}</p>
      <div>
        <button onClick={changeTitleVanilla}>
          Change Title (Vanilla JS) 
        </button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={changeTitleReact}>
          Change Title (React)
        </button>
      </div>
    </div>
  );
}

export default App;
