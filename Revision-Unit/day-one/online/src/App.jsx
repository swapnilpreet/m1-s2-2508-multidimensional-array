import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Status,setStatus]=useState(navigator.onLine);
  // console.log(navigator.onLine)
  let handleonline=()=>{
    setStatus(true)
  }
  let handleoffline=()=>{
    setStatus(false);
  }
  useEffect(()=>{
    window.addEventListener('online',handleonline);
    window.addEventListener("offline",handleoffline);
    return ()=>{
      window.removeEventListener('online',handleonline);
      window.removeEventListener('offline',handleoffline);
    }
  }, []);

// console.log(Status);

  return (
    <>
      <div>
          <h1>{Status ? "🟢 Online" :"🔴 Offline"}</h1>
      </div>
    </>
  );
}

export default App;
