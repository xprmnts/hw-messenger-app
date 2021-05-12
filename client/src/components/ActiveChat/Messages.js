import React, { useRef, useEffect } from 'react';
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
    const lastMessageRef = useRef();

    useEffect(() => {
        console.log(lastMessageRef);
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ smooth: true });
        }
    });

    return (
        <Box className={props.classes.root}>
            {messages.map((message, index) => {
                const lastMessage = messages.length - 1 === index;
                const time = moment(message.createdAt).format('h:mm');

                return message.senderId === userId ? (
                    <SenderBubble
                        ref={lastMessage ? lastMessageRef : null}
                        key={message.id}
                        text={message.text}
                        time={time}
                    />
                ) : (
                    <OtherUserBubble
                        ref={lastMessage ? lastMessageRef : null}
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
