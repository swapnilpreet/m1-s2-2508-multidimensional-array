import React from "react";
import { useTimer } from "../hooks/useTimer";

const Timer = () => {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div style={styles.container}>
      <h2>⏱ Timer</h2>
      <p style={styles.timerDisplay}>{timer} seconds</p>
      <div style={styles.buttons}>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "white",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  timerDisplay: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
};

export default Timer;
