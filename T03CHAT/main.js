const http = require("http");
const express = require("express");
const logger = require("morgan");
const WebSocket = require("ws");
const fs = require("fs").promises;

const app = express();
const port = 8080;

function myMiddleware(req, res, next) {
  console.log(`Request for ${req.url}`);
  next();
}

app.use(myMiddleware);
app.use(logger("dev"));
app.use(express.static("."));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Connection open");
  ws.on("message", (message) => {
    console.log(`[SERVER] Message received: ${message}`);
    ws.send("Hello from server again!");
  });
  ws.send("Hello from server!");
});

app.get("/", (req, res) => {
  fs.readFile("index.html", "utf8").then((contents) => {
    res.send(contents);
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});