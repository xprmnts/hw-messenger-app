const socketMessageHandler = (socket) => {
  return ({ data, to }) => {
    socket.to(to).to(socket.userId).emit('new-message', data);
  };
};

module.exports = socketMessageHandler;
