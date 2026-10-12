
const API_URL = "http://localhost:5000/api/tasks";

const statusElement = document.getElementById("status");
const taskList = document.getElementById("taskList");

async function loadTasks() {
  statusElement.textContent = "Loading...";
  statusElement.className = "";
  taskList.replaceChildren();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const result = await response.json();

    result.data.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title;

      if (task.completed) {
        li.className = "completed";
        li.textContent += " (Completed)";
      } else {
        li.textContent += " (Pending)";
      }

      taskList.appendChild(li);
    });

    statusElement.textContent = "Tasks loaded successfully!";
  } catch (error) {
    statusElement.textContent =
      "Unable to load tasks. Please check whether the server is running.";
    statusElement.className = "error";

    console.error(error);
  }
}

loadTasks();