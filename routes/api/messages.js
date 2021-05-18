const router = require('express').Router();
const { Conversation, Message } = require('../../db/models');
const { Op } = require('sequelize');

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post('/', async (req, res, next) => {
  let io = req.app.get('socketio');
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      //validate request is coming from a user that exists in this conversation
      const convo = await Conversation.findOne({
        where: {
          [Op.or]: {
            id: conversationId
          }
        },
        attributes: ['user1Id', 'user2Id']
      });

      if (
        convo.dataValues.user1Id !== req.user.id &&
        convo.dataValues.user2Id !== req.user.id
      ) {
        return res.sendStatus(401);
      }

      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      if (req.body.sender.id !== req.user.id) {
        return res.sendStatus(401);
      }
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId
      });
      for (let [id, socket] of io.of('/').sockets) {
        if (socket.userId === sender.id) {
          sender.online = true;
        }
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  const unreadMessageIds = req.body.data.unreadMessageIds;
  try {
    const result = await Message.update(
      {
        readStatus: true
      },
      {
        where: {
          id: { [Op.in]: unreadMessageIds }
        }
      }
    );
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
