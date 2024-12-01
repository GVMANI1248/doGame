import React, { useState, useEffect } from "react";
import Task from "./Task";

const TaskManager = ({ totalPoints, setTotalPoints, setCompletedTasks }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, { name: taskName, points: 0, completed: false }]);
      setTaskName("");
    }
  };

  const updateTaskPoints = (index, delta) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, points: Math.max(0, task.points + delta) } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index, newName) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const taskPoints = tasks[index].points;
    setTotalPoints(totalPoints + taskPoints);

    const task = { ...tasks[index], completed: true };
    setCompletedTasks((prev) => [...prev, task]);

    deleteTask(index); // Move to completed and remove from tasks
  };

  return (
    <div className="task-manager">
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onPointsChange={(delta) => updateTaskPoints(index, delta)}
            onComplete={() => completeTask(index)}
            onEdit={(newName) => editTask(index, newName)}
            onDelete={() => deleteTask(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
