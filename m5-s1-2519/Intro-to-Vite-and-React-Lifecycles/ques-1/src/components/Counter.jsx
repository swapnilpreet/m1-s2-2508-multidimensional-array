import React, { useState } from 'react';

const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Counter: {count}</h1>
      <button onClick={increment} style={{ marginRight: '1rem' }}>
        Increment
      </button>
      <button onClick={decrement} disabled={count === 0}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
