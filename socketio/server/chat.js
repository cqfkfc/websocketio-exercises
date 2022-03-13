const express = require("express");
const app = express();
const socketio = require("socket.io");

// take every thing from public folder and load at localhost:9000
app.use(express.static(__dirname + "/public"));
const expressServer = app.listen(9700);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log("connection id at server:", socket.id);
  socket.emit("messageFromServer", {
    data: "This is a message from the socket IO server",
  });

  socket.on("messageToServer", (data) => console.log("data", data));
});
