import React, { useEffect, useState } from "react";

const BatteryStatus = () => {
  const [batterylevel, setBatterylevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);
 
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        console.log(battery);
        setBatterylevel(battery.level * 100);
        isCharging(battery.charging);
         battery.onlevelchange = () => {
          setBatterylevel(Math.round(battery.level * 100));
        };
        battery.onchargingchange = () => {
          setIsCharging(battery.charging);
        };
      });
    } else {
      alert("Battery Status API is not supported on this browser.");
      let dummy = 100;
      let interval = setInterval(() => {
        dummy = dummy > 0 ? dummy - 10 : 100;
        setBatterylevel(dummy);
        setIsCharging(dummy % 30 === 0);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, []);

  let icon = "🔋";
  if (isCharging) {
    icon = "⚡";
  } else if (batterylevel < 20) {
    icon = "🔴";
  }
  
  return(
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Battery Status</h2>
        <div style={{ fontSize: "40px" }}>{icon}</div>
        <p>Battery: {batterylevel}%</p>
        <p>{isCharging ? "Charging..." : "Not Charging"}</p>
      </div>
    </div>
  );
};

export default BatteryStatus;
