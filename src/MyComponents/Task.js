import React, { useState, useEffect } from 'react';

const Task = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.text);

  useEffect(() => {
    localStorage.setItem(`task_${task.id}`, editedTask);
  }, [editedTask, task.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit({ ...task, text: editedTask });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.text}
          </span>
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
