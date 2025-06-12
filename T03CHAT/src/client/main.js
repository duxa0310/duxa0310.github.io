let socket;

function displayMessage(messageData) {
    const messagesPane = document.getElementById('message-list');
    const msgPane = document.createElement('div');
    msgPane.className = 'message';

    const timestamp = new Date(messageData.time).toLocaleTimeString();

    msgPane.innerHTML = `<strong>${messageData.username}</strong> 
        <span style="color: #777777; font-size: 10px;">${timestamp}</span><br>
        ${messageData.text}`;

    messagesPane.appendChild(msgPane);
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (message && socket) {
        socket.emit('messageToServer', message);
        input.value = '';
    }
}

function logout() {
    localStorage.removeItem('username');
    window.location.href = '/';
}

function main() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = '/';
    }
    document.getElementById('account-name').textContent = username;

    window.addEventListener("load", async function () {
        socket = io();

        socket.on("connect", () => {
            console.log("Connected with ID:", socket.id);
            socket.emit('setUsername', username);

            socket.on('previousMessages', (messages) => {
                messages.forEach(msg => displayMessage(msg));
            });

            socket.on('messageFromServer', (messageData) => {
                displayMessage(messageData);
            });
        });

        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id);
        });
    });
}

main();