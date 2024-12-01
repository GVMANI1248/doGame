import React from "react";

const CompletedTasks = ({ completedTasks, setCompletedTasks }) => {
  const deleteCompletedTask = (index) => {
    const updatedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedTasks);
  };

  return (
    <div className="completed-tasks">
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        completedTasks.map((task, index) => (
          <div key={index} className="completed-task">
            <span>{task.name} - {task.points} points</span>
            <button onClick={() => deleteCompletedTask(index)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedTasks;
