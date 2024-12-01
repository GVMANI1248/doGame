import React, { useState } from "react";

const Task = ({ task, onPointsChange, onComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(newName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task">
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      ) : (
        <h3>{task.name}</h3>
      )}
      <div className="task-controls">
        <button onClick={() => onPointsChange(-5)}>-5</button>
        <span>{task.points} points</span>
        <button onClick={() => onPointsChange(5)}>+5</button>
      </div>
      <div className="task-actions">
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        <button onClick={onDelete}>Delete</button>
        <button
          onClick={onComplete}
          disabled={task.completed}
          className="complete-button"
        >
          {task.completed ? "Completed" : "Complete"}
        </button>
      </div>
    </div>
  );
};

export default Task;
