const socketMessageHandler = (io, socket) => {
  return ({ data, to }) => {
    let recipientSocketId;
    // get the socket id of the recipient
    for (let [id, socket] of io.of('/').sockets) {
      if (socket.userId === to) {
        recipientSocketId = id;
      }
    }

    // if recipient is online emit a message to them
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit('new-message', data);
    }
  };
};

module.exports = socketMessageHandler;
