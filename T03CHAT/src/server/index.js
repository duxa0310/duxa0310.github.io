const http = require("http");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const path = require("path");
const mongodb = require("mongodb");

const app = express();
const port = 8080;
const dbUrl = "mongodb://localhost:27017";

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
    "/socket.io",
    express.static(__dirname + "/../../node_modules/socket.io/client-dist"),
);

const server = http.createServer(app);
const io = new Server(server);

/* Database handle */

let clients = [];      // Sockets list
let users = new Map(); // Users-passwords map

let messagesCollection, usersCollection;

async function dbInit() {
    const client = new mongodb.MongoClient(dbUrl);
    try {
        const connection = await client.connect();
        const db = connection.db("MyData");
        messagesCollection = db.collection("MessageCollection");
        usersCollection = db.collection("UserCollection");
    } catch (err) {
        console.error(err)
    }
}

async function dbAddMessage(messageData) {
    try {
        const response = await messagesCollection.insertOne(messageData);
        console.log(response);
    } catch (err) {
        console.error(err)
    }
}

async function dbGetMessageHistory() {
    try {
        const response = await messagesCollection.find().toArray();
        console.log(response);
        return response;
    } catch (err) {
        console.error(err)
    }
}

async function dbAddUser(username, password) {
    try {
        const response = await usersCollection.insertOne({ username: username, password: password });
        console.log(response);
    } catch (err) {
        console.error(err)
    }
}

async function dbCheckUserExist(username) {
    try {
        const response = await usersCollection.find({ username: username }).toArray();
        console.log(response);
        return response != undefined && response.length > 0;
    } catch (err) {
        console.error(err)
    }
    return false;
}

async function dbGetUserPassword(username) {
    try {
        const response = await usersCollection.findOne({ username: username });
        console.log(response);
        return response.password;
    } catch (err) {
        console.error(err)
    }
}

/* App handle */

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
    } else if (await dbCheckUserExist(username)) {
        if (await dbGetUserPassword(username) != password) {
            res.json({
                success: false,
                error: "Incorrect password",
            });
        } else {
            res.json({ success: true });
        }
    } else {
        await dbAddUser(username, password);
        res.json({ success: true });
    }
});

io.on("connection", async (socket) => {
    clients.push(socket);
    console.log(`Client connected to site with socket id: ${socket.id}`);

    socket.on("setUsername", (username) => {
        socket.username = username;
        console.log(`User ${username} connected to chat`);
    });

    socket.on("messageToServer", async (msg) => {
        const messageData = {
            id: Date.now(),
            text: msg,
            username: socket.username || "Anonymous",
            time: new Date().toISOString(),
        };

        await dbAddMessage(messageData);
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

    const messages = await dbGetMessageHistory();
    socket.emit("previousMessages", messages);
});

server.listen(port, () => {
    console.log(`Server started: ${JSON.stringify(server.address())}`);
});

dbInit();