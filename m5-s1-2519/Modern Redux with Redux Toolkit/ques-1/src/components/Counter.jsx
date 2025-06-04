import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../counterSlice';

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter</h2>
      <p style={{ fontSize: '24px' }}>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
