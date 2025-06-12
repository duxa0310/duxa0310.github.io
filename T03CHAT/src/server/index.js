const http = require("http");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const port = 8080;

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
    "/socket.io",
    express.static(__dirname + "/../../node_modules/socket.io/client-dist"),
);

const server = http.createServer(app);
const io = new Server(server);

let clients = [];      // Sockets list
let messages = [];     // Messages list
let users = new Map(); // Users-passwords map

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "login.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "chat.html"));
});

app.use(express.static("src"));

app.post("/auth", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.json({
            success: false,
            error: "Username and password required",
        });
    } else if (username.length < 3) {
        res.json({
            success: false,
            error: "Username must be at least 3 characters",
        });
    } else if (users.has(username) && users.get(username) != password) {
        res.json({
            success: false,
            error: "Incorrect password",
        });
    } else {
        users.set(username, password);
        res.json({ success: true });
    }
});

io.on("connection", (socket) => {
    clients.push(socket);
    console.log(`Client connected to site with socket id: ${socket.id}`);

    socket.emit("previousMessages", messages);

    socket.on("setUsername", (username) => {
        socket.username = username;
        console.log(
            `User ${username} connected to chat`,
        );
    });

    socket.on("messageToServer", (msg) => {
        const messageData = {
            id: Date.now(),
            text: msg,
            username: socket.username || "Anonymous",
            time: new Date().toISOString(),
        };

        messages.push(messageData);
        console.log(`Message from ${messageData.username}: ${msg}`);

        for (let client of clients) {
            client.emit("messageFromServer", messageData);
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