import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { setActiveChat } from '../../store/activeConversation';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab'
    }
  }
}));

const Chat = (props) => {
  const [unreadMessages, setUnreadMessages] = useState(0);

  const classes = useStyles();
  const currentUserId = useSelector((state) => state.user.id);
  const otherUser = props.conversation.otherUser;

  const dispatch = useDispatch();

  const handleClick = async (conversation) => {
    await dispatch(setActiveChat(conversation.otherUser.username));
  };

  useEffect(() => {
    const allMessages = props.conversation.messages;
    let unreadTempMessages = [];
    let idx = allMessages.length - 1;

    while (idx > 0) {
      if (
        allMessages[idx].senderId !== currentUserId &&
        !allMessages[idx].readStatus
      ) {
        unreadTempMessages.push(allMessages[idx]);
      }

      if (
        allMessages[idx].senderId !== currentUserId &&
        allMessages[idx].readStatus
      ) {
        break;
      }

      idx--;
    }

    setUnreadMessages(unreadTempMessages);

    // last message in conovo isn't the current users' and it hasn't been read
    // set lastMessageStatus to fals
  }, [props.conversation, currentUserId]);

  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={props.conversation}
        unreadMessages={unreadMessages}
      />
    </Box>
  );
};

export default Chat;
