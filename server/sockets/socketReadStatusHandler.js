const socketReadStatusHandler = (io, socket) => {
  return ({ message, to }) => {
    socket.to(to).to(socket.userId).emit('read-messages', message);
  };
};

module.exports = socketReadStatusHandler;
