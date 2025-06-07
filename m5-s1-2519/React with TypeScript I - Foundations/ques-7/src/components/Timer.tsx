import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 500);
    }
    return () => {
      if (interval !== undefined) {
        clearInterval(interval)
      };
    };
  }, [isRunning]);

  const startTimer = (): void => setIsRunning(true);
  const stopTimer = (): void => setIsRunning(false);
  const resetTimer = (): void => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div>
      <h2>{seconds} second{seconds !== 1 && 's'}</h2>
      <div>
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
