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
      return next();
    });

    next();
  };
};

module.exports = socketMiddleware;

// use token to set userId once handling cases if there are multiple cookies
// const cookies = socket.handshake.headers.cookie.split(';');
// let accessToken;
// cookies.forEach((cookie) => {
//   const [name, token] = cookie.split('=');
//   if (name === 'messengerAppAccessToken') {
//     return (accessToken = token);
//   }
// });

// if (!socket.userId && accessToken) {
//   console.log('validating token and setting user id to socket', socket.id);

// }
