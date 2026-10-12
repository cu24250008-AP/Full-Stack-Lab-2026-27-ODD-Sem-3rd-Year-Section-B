
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";
const API_KEY = "antra_lab6_secret_key";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTasks() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const result = await response.json();
      setTasks(result.data);
    } catch (err) {
      setError("Tasks load nahi hue. Check the backend server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not add task");
      }

      setTitle("");
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not delete task");
      }

      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <h1>My Task Manager</h1>
      <p>Full Stack Lab Sheet 6 — React API Client</p>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button type="submit">Add Task</button>
      </form>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <span>
                {task.title} — {task.completed ? "Completed" : "Pending"}
              </span>

              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;