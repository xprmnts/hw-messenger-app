import React from 'react';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
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

const Messages = props => {
    const { messages, otherUser, userId } = props;

    return (
        <Box className={props.classes.root}>
            {messages.map(message => {
                const time = moment(message.createdAt).format('h:mm');

                return message.senderId === userId ? (
                    <SenderBubble
                        key={message.id}
                        text={message.text}
                        time={time}
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
        </Box>
    );
};

export default withStyles(styles)(Messages);
