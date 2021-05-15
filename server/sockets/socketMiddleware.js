//middleware to check username and allow connection
const jwt = require('jsonwebtoken');

const socketMiddleware = () => {
  return (socket, next) => {
    const cookies = socket.handshake.headers.cookie.split(';');
    let accessToken;
    cookies.forEach((cookie) => {
      const [name, token] = cookie.split('=');
      if (name === 'messengerAppAccessToken') {
        return (accessToken = token);
      }
    });

    jwt.verify(accessToken, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      socket.userId = decoded.id;
      socket.username = decoded.username;
      return next();
    });

    next();
  };
};

module.exports = socketMiddleware;
