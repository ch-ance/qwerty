const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";
const WebSocket = require("ws");

const wsServer = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    threshold: 1024,
  },
});

wsServer.on("connection", function connection(ws) {
  console.log("New connection!");

  // log when a message comes in
  ws.on("message", function incoming(message) {
    console.log("Received: ", message);
  });
});
