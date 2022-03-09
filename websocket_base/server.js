const http = require("http");
const websocket = require("ws");

const httpServer = http.createServer((req, res) => {
  res.end("http server is connected");
});
const websocketServer = new websocket.Server({server: httpServer});

websocketServer.on("headers", (headers, req) => {
  console.log("headers:", headers);
});

websocketServer.on("connection", (ws, req) => {
  console.log("on: connection");
  ws.send("hello!");
  websocketServer.on("message", (ws, req) => {
    console.log("on: message");
  });
});

httpServer.listen(8000);
