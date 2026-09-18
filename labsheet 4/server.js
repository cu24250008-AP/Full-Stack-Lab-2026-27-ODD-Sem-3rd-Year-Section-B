const http = require("http");

const students = [
  {
    id: 1,
    name: "Student 1",
    course: "B.Tech CSE"
  },
  {
    id: 2,
    name: "Student 2",
    course: "B.Tech CSE"
  },
  {
    id: 3,
    name: "Student 3",
    course: "B.Tech CSE"
  }
];

const server = http.createServer((req, res) => {

  // GET /
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });

    return res.end("Welcome to Student API");
  }

  // GET /students
  if (req.method === "GET" && req.url === "/students") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify(students));
  }

  // GET /students/:id
  if (req.method === "GET" && req.url.startsWith("/students/")) {

    const id = parseInt(req.url.split("/")[2]);

    const student = students.find((s) => s.id === id);

    if (student) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      return res.end(JSON.stringify(student));
    } else {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      return res.end(
        JSON.stringify({
          error: "Student not found"
        })
      );
    }
  }

  // Other routes
  res.writeHead(404, {
    "Content-Type": "text/html"
  });

  res.end("<h1>404 - Page Not Found</h1>");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});