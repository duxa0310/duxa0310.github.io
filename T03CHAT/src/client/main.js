const io = require("socket.io-client");

async function main() {
    const socket = io();

    socket.on("connect", () => {
        console.log(socket.id);
        socket.emit("messageToServer", `Hello`);
        socket.on("messageFromServer", function (msg) {
            const messages = document.getElementById("main")
            const item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            console.log(msg);
        });
    });

    socket.on("disconnect", () => {
        console.log(socket.id); // undefined
    });
}

window.addEventListener("load", () => {
    main();
});