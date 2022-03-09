const express = require("express");
const app = express();

const socketio = require("socket.io");
app.use(express.static(__dirname + "/chat"));

const expressServer = app.listen(9000);
const socketioServer = socketio(expressServer);

socketioServer.on("connection", (connection) => {
  connection.emit("hi");
});
