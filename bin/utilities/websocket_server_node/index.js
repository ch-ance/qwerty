const WebSocket = require("ws");

const ws = new WebSocket("http://localhost:8080");

ws.on("open", () => {
  console.log("Connected to WebSocket Server");
  ws.send("hello there");
});
