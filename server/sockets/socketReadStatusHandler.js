const socketReadStatusHandler = (socket) => {
  return ({ messages, to }) => {
    socket.to(to).to(socket.userId).emit('read-messages', messages);
  };
};

module.exports = socketReadStatusHandler;
