const socketMessageHandler = (socket) => {
  return ({ data, to }) => {
    socket.to(to).emit('new-message', data);
  };
};

module.exports = socketMessageHandler;
