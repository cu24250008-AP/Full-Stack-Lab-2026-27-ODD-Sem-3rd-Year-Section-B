
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.originalUrl} - ${new Date().toISOString()}`
  );
  next();
});

// Five sample tasks
let tasks = [
  { id: 1, title: "Learn HTML", completed: true },
  { id: 2, title: "Learn CSS", completed: true },
  { id: 3, title: "Learn JavaScript", completed: false },
  { id: 4, title: "Learn React", completed: false },
  { id: 5, title: "Build REST API", completed: false }
];

let nextId = 6;

// Authentication middleware
function authCheck(req, res, next) {
  if (req.headers["x-api-key"] !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Invalid or missing API key"
    });
  }

  next();
}

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json({ success: true, data: tasks });
});

// GET one task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      success: false,
      error: "Task not found"
    });
  }

  res.json({ success: true, data: task });
});

// POST new task
app.post("/api/tasks", authCheck, (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: "Title is required"
    });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  tasks.push(task);
  res.status(201).json({ success: true, data: task });
});

// PUT update task
app.put("/api/tasks/:id", authCheck, (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      success: false,
      error: "Task not found"
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: "Title must be a non-empty string"
      });
    }
    task.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        error: "Completed must be true or false"
      });
    }
    task.completed = completed;
  }

  res.json({ success: true, data: task });
});

// DELETE task
app.delete("/api/tasks/:id", authCheck, (req, res) => {
  const index = tasks.findIndex(
    t => t.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: "Task not found"
    });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  res.json({ success: true, data: deletedTask });
});

// Unknown route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    error: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});