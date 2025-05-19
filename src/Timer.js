import React, { useState, useEffect } from "react";
import "./App.css"

export function getTimeSpent(task) {
  if (task.startTime && task.endTime) {
    const ms = task.endTime - task.startTime;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
  if (task.startTime && task.status === "in progress") {
    const ms = Date.now() - task.startTime;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s (running...)`;
  }
  return "Not started";
}

function Timer({ task, onUpdate }) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    const updated = { ...task, startTime: Date.now(), status: "in progress" };
  if (typeof onUpdate === "function") {
    onUpdate(task.id, updated);}
  };
 

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setIsPaused(false);
    const updated = { ...task, endTime: Date.now(), status: "completed" };
    onUpdate(task.id, updated);
  };

  return (
    <div className="timer" style={{ marginTop: "10px" }}>
      <h4>⏱️ Timer: {time}s</h4>
      {!isActive && time === 0 && <button onClick={handleStart}>Start</button>}
      {isActive && !isPaused && <button onClick={handlePause}>Pause</button>}
      {isActive && isPaused && <button onClick={handleResume}>Resume</button>}
      {(isActive || time > 0) && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}


export default Timer;