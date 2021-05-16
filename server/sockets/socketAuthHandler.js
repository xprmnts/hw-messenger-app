const socketLoginHandler = (socket) => {
  return () => {
    // send the user who just went online to everyone else who is already online
    socket.broadcast.emit('add-online-user', socket.userId);
  };
};

const socketLogoutHandler = (socket) => {
  return () => {
    console.log('user logged out');

    socket.broadcast.emit('remove-offline-user', socket.userId);

    socket.disconnect();
  };
};

module.exports = { socketLoginHandler, socketLogoutHandler };
