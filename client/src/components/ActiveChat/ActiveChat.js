import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
    maxHeight: '100%'
  },
  chatHeader: {
    minHeight: '6rem'
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    height: '80%'
  }
}));

const ActiveChat = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const conversations = useSelector((state) => state.conversations);
  const currentRecipient = useSelector((state) => state.activeConversation);

  const conversation =
    conversations.find(
      (convo) => convo.otherUser.username === currentRecipient
    ) || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            className={classes.chatHeader}
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
