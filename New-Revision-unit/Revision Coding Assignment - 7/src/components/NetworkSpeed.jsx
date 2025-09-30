import React, { useState } from 'react'

const NetworkSpeed = () => {
  const [status, setStatus] = useState(null);
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const checkSpeed=async()=>{
    setLoading(true);
    setStatus(null);
    setIcon("");
    try{
      const startTime=performance.now();
      await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const endTime=performance.now();
      const duration=endTime-startTime;
      if(duration<1000) {
        setStatus("Fast");
        setIcon("🚀");
      }else{
        setStatus("Slow");
        setIcon("🐢");
      }
    }catch(error){
      console.log(error)
      setStatus("Error");
      setIcon("⚠️");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Network Speed Test</h2>
      <button
        onClick={checkSpeed}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        {loading ? "Checking..." : "Check Speed"}
      </button>

      {status && (
        <div style={{ marginTop: "20px", fontSize: "24px" }}>
          {icon} {status}
        </div>
      )}
    </div>
  );
}

export default NetworkSpeed