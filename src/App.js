import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';

const API_URL = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  useEffect(() => {
    if (user) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => setTasks(data));
    }
  }, [user]);

  const addTask = () => {
    if (newTask !== "") {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask, done: false, priority: priority })
      })
        .then(res => res.json())
        .then(data => {
          setTasks([...tasks, data]);
          setNewTask("");
          setPriority("medium");
        });
    }
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter(task => task.id !== id)));
  };

  const toggleDone = (task) => {
    fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, done: !task.done })
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t => t.id === updated.id ? updated : t));
      });
  };

  // Show Login page
  if (page === "login") {
    return <Login onLogin={(name) => { setUser(name); setPage("app"); }} goToRegister={() => setPage("register")} />;
  }

  // Show Register page
  if (page === "register") {
    return <Register goToLogin={() => setPage("login")} />;
  }

  // Show Main App
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>📝 Task Manager</h1>
        <div>
          <span style={{ marginRight: "15px", color: "#2c3e50" }}>👋 Hello, {user}!</span>
          <button className="delete-btn" onClick={() => { setUser(null); setPage("login"); }}>Logout</button>
        </div>
      </div>

      <div className="input-section">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <button className="add-btn" onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li className={`task-item priority-${task.priority}`} key={task.id}>
            <div className="task-left">
              <span
                className={`task-text ${task.done ? "done" : ""}`}
                onClick={() => toggleDone(task)}
              >
                {task.text}
              </span>
              <span className={`priority-badge badge-${task.priority}`}>
                {task.priority}
              </span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;