import React, { useState } from "react";

const APIFetch = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState(1);
 
  const fetchJokes = async () => {
    setLoading(true); 
    setError(false);
    try {
      let newJokes = [];
      for (let i = 0; i < count; i++) {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await res.json();
        newJokes.push(data);
      }
      const latestJoke = newJokes[newJokes.length - 1];
      setJoke(latestJoke);
      setHistory((prev) => {
        const updated = [...newJokes, ...prev];
        return updated.slice(0, 5);
      });
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setLoading(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };
 
  const longestSetup =
    history.length > 0
      ? history.reduce((longest, current) =>
          current.setup.length > longest.setup.length ? current : longest
        )
      : null;

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "Arial" }}>
      <h1>Random Joke App</h1>
      <div>
        <input
          type="number"
          value={count}
          min="1"
          max="5"
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ marginRight: "10px" }}
        />
        <button onClick={fetchJokes}>Get Random Joke</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Failed to fetch joke.</p>}
      {joke && !loading && !error && (
        <div
          style={{
            margin: "20px auto",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "8px",
            maxWidth: "400px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p><strong>{joke.setup}</strong></p>
          <p>{joke.punchline}</p>
        </div>
      )}
      <h2>History (Last 5 Jokes)</h2>
      {history.length === 0 ? (
        <p>No jokes yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, maxWidth: "400px", margin: "0 auto" }}>
          {history.map((item, i) => (
            <li
              key={i}
              style={{
                marginBottom: "10px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor:
                  longestSetup && longestSetup.setup === item.setup
                    ? "#d1f7c4"
                    : "#fff",
                textAlign: "left",
              }}
            >
              <p><strong>{item.setup}</strong></p>
              <p>{item.punchline}</p>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default APIFetch;
