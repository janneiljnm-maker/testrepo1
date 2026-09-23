const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 8080;
const filePath = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  if (req.url !== "/" && req.url !== "/index.html") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  fs.readFile(filePath, "utf8", (error, html) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Could not load index.html");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
