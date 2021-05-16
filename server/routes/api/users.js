const router = require('express').Router();
const { User } = require('../../db/models');
const { Op } = require('sequelize');

// find users by username
router.get('/:username', async (req, res, next) => {
  let io = req.app.get('socketio');
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username
        },
        id: {
          [Op.not]: req.user.id
        }
      }
    });

    const onlineUsers = new Set();
    for (let [id, socket] of io.of('/').sockets) {
      onlineUsers.add(socket.userId);
    }

    const arrayOfOnlineUsers = [...onlineUsers.values()];
    // add online status to each user that is online
    for (let i = 0; i < users.length; i++) {
      const userJSON = users[i].toJSON();
      if (arrayOfOnlineUsers.includes(userJSON.id)) {
        userJSON.online = true;
      }
      users[i] = userJSON;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
