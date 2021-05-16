const socketMiddleware = require('../sockets/socketMiddleware');
const socketMessageHandler = require('../sockets/socketMessageHandler');
const {
  socketLoginHandler,
  socketLogoutHandler
} = require('../sockets/socketAuthHandler');

// define constructor function that gets `io` send to it
module.exports = function (io) {
  io.use(socketMiddleware()); // add userId property to socket
  io.on('connection', (socket) => {
    socket.join(socket.userId);

    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push(socket.userId);
    }
    socket.emit('users', users);

    socket.on('go-online', socketLoginHandler(socket));
    socket.on('logout', socketLogoutHandler(socket));
    socket.on('new-message', socketMessageHandler(socket));
  });
};
