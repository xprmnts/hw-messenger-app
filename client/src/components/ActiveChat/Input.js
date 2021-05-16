import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { postMessage } from '../../store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20
  }
}));

const Input = (props) => {
  const user = useSelector((state) => state.user);
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleChange = (event) => {
    setInputText(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentFieldValue = event.target.text.value;

    // prevent empty messages to trigger message submission
    if (currentFieldValue.trim().length === 0) {
      return;
    }
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : user
    };

    await dispatch(postMessage(reqBody));
    setInputText('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={inputText}
          onChange={handleChange}
          name="text"
        />
      </FormControl>
    </form>
  );
};

export default Input;
