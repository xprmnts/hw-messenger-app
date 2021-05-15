const socketMessageHandler = (socket) => {
  return ({ data, to }) => {
    socket.to(to).to(socket.username).emit('new-message', data);
  };
};

module.exports = socketMessageHandler;
