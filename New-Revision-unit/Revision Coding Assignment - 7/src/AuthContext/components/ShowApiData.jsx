import React, { useEffect, useState } from "react";

const ShowApiData = () => {
  const [showdata, setshowdata] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (isOnline) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => setshowdata(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [isOnline]);
 
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (!isOnline) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        🔴 Currently you are offline.Connect to a network to see the data.
      </div>
    );
  }
  return (
    <div>
      <h2>API Data</h2>
      <div>
        {showdata.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              width: "40%",
              margin: "auto",
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowApiData;
