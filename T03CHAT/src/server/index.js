const http = require("http");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const app = express();
const port = 8002;

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static("dist"));

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

const server = http.createServer(app);
const io = new Server(server);

let clients = [];

io.on("connection", (socket) => {
    clients.push(socket);
    console.log(`Client connected with id: ${socket.id}`);

    socket.on("messageToServer", (msg) => {
        console.log(msg);

        for (let client of clients) {
            client.emit("messageFromServer", `Message from client ${socket.id} was ${msg}`);
        }
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected with id: ${socket.id}`);
        const index = clients.indexOf(socket);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });
});

server.listen(port, () => {
    console.log(`Server started: ${JSON.stringify(server.address())}`);
});
