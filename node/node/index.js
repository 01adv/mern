const http = require("http");
const fs = require("fs");

const PORT = 3000;
const hostname = "localhost";
const home = fs.readFileSync("./index.html", "utf-8");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return res.end(home);
  }
  if (req.url === "/about") {
    return res.end("<h1>ABout Page</h1>");
  }

  if (req.url === "/contact") {
   return res.end("<h1>contact Page</h1>");
  }

  if (req.url === "/service") {
    return res.end("<h1>Service Page</h1>");
  } else {
    return res.end("<h1>error 404</h1>");
  }
});

server.listen(PORT, hostname, () => {
  console.log(`server is working on http://${hostname}:${PORT}`);
});
