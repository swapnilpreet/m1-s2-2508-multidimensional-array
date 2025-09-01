import {useState} from "react";
import CounterContext from "./CounterContext";

const CounterProvider=({children})=>{
  const [count, setCount] = useState(0);
  const increment=()=>{
    if(count<10){
        setCount((c)=>c+1);
    }
  };
  const decrement = () =>{
    if(count>0){
        setCount((c)=>c-1);
    }
  };
  const reset = () => setCount(0);
  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset}}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;
