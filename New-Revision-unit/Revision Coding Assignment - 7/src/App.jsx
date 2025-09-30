import "./App.css";
import BatteryStatus from "./components/BatteryStatus";
import NetworkSpeed from "./components/NetworkSpeed";
import ShowApiData from "./components/ShowApiData";
import Speech from "./components/Speech";

function App() {
  return (
    <>
      <BatteryStatus />
      <NetworkSpeed />
      <Speech />
      <ShowApiData />
    </>
  );
}

export default App;
