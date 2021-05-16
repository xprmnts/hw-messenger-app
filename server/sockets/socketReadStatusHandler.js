const socketReadStatusHandler = (io, socket) => {
  return ({ messages, to }) => {
    console.log('sending read to ', to);
    let recipientSocketId;
    // get the socket id of the recipient
    for (let [id, socket] of io.of('/').sockets) {
      if (socket.userId === to) {
        recipientSocketId = id;
      }
    }

    // if recipient is online emit a message to them via their private room
    // by default socket provides every socket an id which also behaves as the
    // pointer to a private room which the user is already a part of
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit('read-messages', messages);
    }
  };
};

module.exports = socketReadStatusHandler;
