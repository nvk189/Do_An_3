const socketIo = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("orderPlaced", (order) => {
      console.log("Order placed: ", order);
      io.emit("orderNotification", order);
    });

    socket.on("orderApproved", (order) => {
      console.log("Order approved: ", order);
      io.emit("orderUpdate", order);
    });

    socket.on("orderStatusChanged", (order) => {
      console.log("Order status changed: ", order);
      io.emit("orderStatusUpdate", order);
    });
  });
};

module.exports = {
  initializeSocket,
};
