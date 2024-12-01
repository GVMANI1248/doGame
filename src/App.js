import React, { useState, useEffect } from "react";
import TaskManager from "./components/TaskManager";
import CompletedTasks from "./components/CompletedTasks";
import "./styles.css";

function App() {
  const [totalPoints, setTotalPoints] = useState(
    parseInt(localStorage.getItem("totalPoints")) || 0
  );
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("completedTasks")) || []
  );

  // Generate Fibonacci sequence to determine level thresholds
  const calculateFibonacciThresholds = (n) => {
    const fib = [100, 200]; // First two levels
    for (let i = 2; i <= n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
  };

  const levelThresholds = calculateFibonacciThresholds(10); // Calculate up to Level 10

  const calculateLevel = (points) => {
    let level = 0;
    let cumulativePoints = 0;
    for (let i = 0; i < levelThresholds.length; i++) {
      cumulativePoints += levelThresholds[i];
      if (points < cumulativePoints) {
        return level;
      }
      level++;
    }
    return level;
  };

  const calculateRange = (level) => {
    let start = 0;
    let cumulativePoints = 0;
    for (let i = 0; i < level; i++) {
      cumulativePoints += levelThresholds[i];
    }
    const end = cumulativePoints + levelThresholds[level] - 1;
    return [cumulativePoints, end];
  };

  const currentLevel = calculateLevel(totalPoints);
  const [rangeStart, rangeEnd] = calculateRange(currentLevel);

  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [totalPoints, completedTasks]);

  return (
    <div className="app">
      <header>
        <h1 className="level">
          Level {currentLevel}
        </h1>
        <h4 className="range">({rangeStart} - {rangeEnd})</h4>
        <p className="totalpoints">Total Points: {totalPoints}</p>
      </header>
      <TaskManager
        totalPoints={totalPoints}
        setTotalPoints={setTotalPoints}
        setCompletedTasks={setCompletedTasks}
      />
      <CompletedTasks
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}
      />
    </div>
  );
}

export default App;
