const express = require("express");
const PORT = 5000;
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: "https://card-game-s.herokuapp.com",
});

const users = [];

io.on("connection", function (socket) {
  //    console.log("connection establised");
  socket.on("user-joined", (users) => {
    socket.broadcast.emit("new-user-joined", users);
  });

  //  get state form client
  socket.on("start", (state) => {
    //   boroacast state to other client connnected to use
    socket.broadcast.emit("states", state);
  });

  //  get flip state
  socket.on("flip", (args) => {
    socket.broadcast.emit("fliped-success", args);
  });

  //   set reload acknowladgement to client
  socket.on("reset", (args) => {
    socket.broadcast.emit("reload-success", args);
  });

  // broadcast same card position acroding random number that resides on client side
  socket.on("set-random", (args) => {
    socket.broadcast.emit("randomize-success", args);
  });

  // broadcast players name, whom will be win
  socket.on("player", (players) => {
    socket.broadcast.emit("winOrLoss",players);
  });

});

server.listen(PORT, () => console.log("server is runnnig on the port " + PORT));
 
