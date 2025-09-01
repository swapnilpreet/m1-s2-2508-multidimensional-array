import "./App.css";
import CounterControls from "./Pages/CounterControls";
import DisplayCounter from "./Pages/DisplayCounter";
import DisplayUser from "./Pages/DisplayUser";

function App() {
  return (
    <>
      <DisplayCounter />
      <CounterControls />
      <DisplayUser />
    </>
  );
}

export default App;
