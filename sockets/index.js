const socketMiddleware = require('../sockets/socketMiddleware');
const socketMessageHandler = require('../sockets/socketMessageHandler');
const {
  socketLoginHandler,
  socketLogoutHandler
} = require('../sockets/socketAuthHandler');
const socketReadStatusHandler = require('./socketReadStatusHandler');

// define constructor function that gets `io` send to it
module.exports = function (io) {
  io.use(socketMiddleware()); // add userId property to socket
  io.on('connection', (socket) => {
    socket.join(socket.userId);

    const onlineUsers = new Set();
    for (let [id, socket] of io.of('/').sockets) {
      onlineUsers.add(socket.userId);
    }
    socket.emit('users', [...onlineUsers.values()]);
    socket.on('read-messages', socketReadStatusHandler(socket));
    socket.on('go-online', socketLoginHandler(socket));
    socket.on('logout', socketLogoutHandler(socket));
    socket.on('new-message', socketMessageHandler(socket));
  });
};
