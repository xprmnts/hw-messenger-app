const onlineUsers = require('../onlineUsers');

const socketLoginHandler = (socket) => {
  return (id) => {
    if (!onlineUsers.includes(id)) {
      onlineUsers.push(id);
    }
    // send the user who just went online to everyone else who is already online
    socket.broadcast.emit('add-online-user', id);
  };
};

const socketLogoutHandler = (socket) => {
  return (id) => {
    console.log('user logged out');
    if (onlineUsers.includes(id)) {
      userIndex = onlineUsers.indexOf(id);
      onlineUsers.splice(userIndex, 1);
      socket.broadcast.emit('remove-offline-user', id);
    }
    socket.disconnect();
  };
};

module.exports = { socketLoginHandler, socketLogoutHandler };
