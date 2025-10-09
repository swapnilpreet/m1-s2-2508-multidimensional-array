import React from 'react'
import {useSelector,useDispatch}from"react-redux";
import { DECREMENT, INCREMENT, Reset } from '../redux/store';

const Counter = () => {
  const count=useSelector((state)=>state.counter.count);
  const dispatch=useDispatch();
  return (
    <div> 
      <h1>Counter: {count}</h1>

      <button onClick={()=>dispatch(INCREMENT())}>Incremnet</button>
      <button onClick={()=>dispatch(DECREMENT())}>Decrement</button>
      <button onClick={()=>dispatch(Reset())}>Reset</button>
    </div>
  )
}

export default Counter