import "./App.css";
import { AuthProvider } from "./AuthContext/Authcontext";
import BatteryStatus from "./AuthContext/components/BatteryStatus";
import NetworkSpeed from "./AuthContext/components/NetworkSpeed";
import ShowApiData from "./AuthContext/components/ShowApiData";
import Speech from "./AuthContext/components/Speech";

function App() {
  return (
    <>
    <AuthProvider>
      <BatteryStatus />
      <NetworkSpeed />
      <Speech />
      <ShowApiData />
    </AuthProvider>
    </>
  );
}

export default App;
