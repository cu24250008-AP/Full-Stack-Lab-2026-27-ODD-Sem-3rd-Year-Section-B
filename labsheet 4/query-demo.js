const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/search") {

    const keyword = parsedUrl.query.keyword;

    res.writeHead(200, {
      "Content-Type": "text/plain"
    });

    return res.end("Search keyword: " + keyword);
  }

  res.writeHead(404, {
    "Content-Type": "text/plain"
  });

  res.end("404 - Page Not Found");
});

server.listen(3001, () => {
  console.log("Search server running at http://localhost:3001");
});