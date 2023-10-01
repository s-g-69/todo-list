import React, { useState, useEffect } from "react";

function TodoList({ currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    setTasks(savedTasks);
  }, [currentUser]);

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem(currentUser, JSON.stringify(tasks));
  }, [tasks, currentUser]);

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      const newTask = { id: Date.now(), text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const handleEditTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => {
                const newText = prompt("Edit task:", task.text);
                if (newText !== null) {
                  handleEditTask(task.id, newText);
                }
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
