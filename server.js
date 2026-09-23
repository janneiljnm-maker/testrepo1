const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 8080;

const server = http.createServer((req, res) => {
  const page = req.url === "/" ? "index.html" : req.url.slice(1);

  if (page !== "index.html" && page !== "come-in.html") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const filePath = path.join(__dirname, page);

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
