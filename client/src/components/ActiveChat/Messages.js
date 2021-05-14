import React, { useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import { updateUnreadMessagesInActiveChat } from '../../store/utils/thunkCreators';
import moment from 'moment';

const styles = {
  root: {
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
};

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const bottomOfMessagesContainerRef = useRef();

  useEffect(() => {
    bottomOfMessagesContainerRef.current.scrollIntoView({ smooth: true });
    updateUnreadMessagesInActiveChat(messages, otherUser, userId);
  });

  return (
    <Box className={props.classes.root}>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format('h:mm');
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
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

export default withStyles(styles)(Messages);
