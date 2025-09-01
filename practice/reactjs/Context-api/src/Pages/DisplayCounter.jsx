import { useCounter } from "../context/Counter/useCounter";

const DisplayCounter = () => {
  const { count } = useCounter();
  return (
    <>
      <h1>Current Count: {count}</h1>
    </>
  );
};

export default DisplayCounter;
