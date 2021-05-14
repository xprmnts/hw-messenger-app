//middleware to check username and allow connection

const socketMiddleware = () => {
  return (socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error('invalid user'));
    }
    socket.userId = userId;
    next();
  };
};

module.exports = socketMiddleware;
