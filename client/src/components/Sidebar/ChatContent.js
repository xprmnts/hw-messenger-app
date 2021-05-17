import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1
  },
  wrapper: {
    flexGrow: 1
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2
  },
  previewText: {
    fontSize: '0.75rem',
    color: '#9CADC8',
    letterSpacing: -0.17,
    flexBasis: '70%',
    maxWidth: '15rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  previewTextHighlighted: {
    fontWeight: 'bold',
    color: '#000'
  },
  notification: {
    minHeight: '1.25rem',
    minWidth: '1.25rem',
    backgroundColor: '#3F92FF',
    margin: 'auto 1rem',
    padding: '0.1rem 0.3rem',
    color: 'white',
    fontSize: '0.65rem',
    letterSpacing: -0.5,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'flex-end'
  },
  latestMessageWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const otherActiveChatUsername = useSelector(
    (state) => state.activeConversation
  );
  const { conversation, unreadMessages } = props;
  const { latestMessageText, otherUser } = conversation;
  const convoHasUnreadMessages =
    unreadMessages.length && otherActiveChatUsername !== otherUser.username;

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Box className={classes.latestMessageWrapper}>
          <Typography
            className={clsx(
              classes.previewText,
              convoHasUnreadMessages && classes.previewTextHighlighted
            )}
          >
            {latestMessageText}
          </Typography>
          {unreadMessages.length > 0 &&
            otherActiveChatUsername !== otherUser.username && (
              <Typography className={classes.notification}>
                {unreadMessages.length > 100 ? '100+' : unreadMessages.length}
              </Typography>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
