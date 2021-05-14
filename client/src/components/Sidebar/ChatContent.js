import React from 'react';
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
    fontSize: 12,
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
    height: 20,
    width: 20,
    backgroundColor: '#3F92FF',
    margin: 'auto 1rem',
    color: 'white',
    fontSize: 10,
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

  const { conversation, unreadMessages } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Box className={classes.latestMessageWrapper}>
          <Typography
            className={`${classes.previewText} ${
              unreadMessages.length ? classes.previewTextHighlighted : ''
            } `}
          >
            {latestMessageText}
          </Typography>
          <Typography className={classes.notification}>
            {unreadMessages.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
