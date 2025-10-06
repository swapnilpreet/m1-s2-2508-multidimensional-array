// import React, { useEffect, useRef, useState } from "react";

// const Counter = () => {
//   const [inputvalue, setInputvalue] = useState(0);
//   const [count, setCount] = useState(
//     () => JSON.parse(localStorage.getItem("count")) || 0
//   );

//   useEffect(() => {
//     localStorage.setItem("count", count);
//     const timeout = setTimeout(() => {
//       alert("Counter updated!", count);
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [count]);

//   const handleIncremnt = () => {
//     if (inputvalue != 0) {
//       setCount((count) => count + inputvalue);
//     } else {
//       setCount((count) => count + 1);
//     }
//   };

//   const handleDecremnt = () => {
//     if (inputvalue != 0) {
//       setCount((count) => count - inputvalue);
//     } else {
//       setCount((count) => count - 1);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="Number"
//         placeholder="add incremnt or decrement number"
//         value={inputvalue}
//         onChange={(e) => setInputvalue(Number(e.target.value))}
//       />
//       <h1>Counter:{count}</h1>
//       <button onClick={handleIncremnt}>Incremnt</button>
//       <button onClick={handleDecremnt}>Decremnt</button>
//       <button
//         onClick={() => {
//           setCount(0), setInputvalue(0);
//         }}
//       >
//         Reset
//       </button>
//     </div>
//   );
// };

// export default Counter;

import React, { useEffect, useReducer } from "react";

const initialState = {
  count: JSON.parse(localStorage.getItem("count")) || 0,
  inputvalue: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "InputValue":
      return {
        ...state,
        inputvalue: action.payload,
      };
    case "Increment":
      return {
        ...state,
        count: state.count + (state.inputvalue != 0 ? state.inputvalue : 1),
      };
    case "Decrement":
      return {
        ...state,
        count: state.count - (state.inputvalue != 0 ? state.inputvalue : 1),
      };
    case "Reset":
      return {
        count: 0,
        inputvalue: "",
      };
    default: {
      return state;
    }
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(state.count));
    const timeout = setTimeout(() => {
      alert(`Counter updated! ${state.count}`);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [state.count]);

  return (
    <div>
      <input
        type="number"
        placeholder="Add incremnt or decrement Number"
        value={state.inputvalue}
        onChange={(e) =>
          dispatch({ type: "InputValue", payload: Number(e.target.value) })
        }
      />
      <h1>Counter : {state.count}</h1>

      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "Increment" })}
      >
        Increment
      </button>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "Decrement" })}
      >
        Decrement
      </button>
      <button
        style={{ padding: "10px" }}
        onClick={() => dispatch({ type: "Reset" })}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
