import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import { updateUnreadMessages } from '../../store/utils/thunkCreators';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Messages = (props) => {
  const [lastReadMessage, setLastReadMessage] = useState();
  const { messages, otherUser, userId } = props;
  const bottomOfMessagesContainerRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    bottomOfMessagesContainerRef.current.scrollIntoView({ smooth: true });
    dispatch(updateUnreadMessages(messages, userId, otherUser.id));
  });
  useEffect(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].senderId === userId && messages[i].readStatus) {
        setLastReadMessage(messages[i].id);
        break;
      }
    }
  }, [messages, userId, setLastReadMessage, lastReadMessage]);

  return (
    <Box className={classes.root}>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format('h:mm');
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            id={message.id}
            text={message.text}
            time={time}
            lastReadMessage={lastReadMessage}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      <div ref={bottomOfMessagesContainerRef}></div>
    </Box>
  );
};

export default Messages;
