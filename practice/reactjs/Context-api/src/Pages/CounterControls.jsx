import { useCounter } from "../context/Counter/useCounter";

const CounterControls = () => {
  const {increment,decrement,reset} = useCounter();
  return (
    <>
       <div className="flex gap-4 mt-4">
      <button
        onClick={increment}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        + Increment
      </button>
      <button
        onClick={decrement}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        - Decrement
      </button>
      <button
        onClick={reset}
        className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        Reset
      </button>
    </div>
    </>
  );
};
export default CounterControls;
