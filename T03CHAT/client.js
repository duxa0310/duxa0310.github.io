export function f() {
  console.log("f");
}

export function openWebSocketCommunication() {
  let socket = new WebSocket("ws://localhost:8080");
  socket.onopen = (e) => {
    console.log("Connection established");
    socket.send("Hello from client!");
  };
  socket.onmessage = (e) => {
    console.log(`[CLIENT] Message received: ${e.data}`);
    socket.send("Hello from client again!");
  };
}

setTimeout(() => {
  openWebSocketCommunication();
}, 1000);