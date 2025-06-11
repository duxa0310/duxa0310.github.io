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
    setTimeout(() => { socket.send("Hello from client again!"); }, 100);
  };
}

setTimeout(() => {
  openWebSocketCommunication();
}, 0);