import socket from '../socket';
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CssBaseline, Button } from '@material-ui/core';
import { SidebarContainer } from './Sidebar';
import { ActiveChat } from './ActiveChat';
import { logout, fetchConversations } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/index';

const styles = {
  root: {
    height: '97vh'
  }
};

const Home = (props) => {
  const user = useSelector((state) => state.user);
  //const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    history.push('/register');
  }

  const handleLogout = async () => {
    await dispatch(logout(user.id));
    dispatch(clearOnLogout());
    history.push('/login');
  };

  useEffect(() => {
    socket.auth = {
      userId: user.id
    };
    socket.connect();
  }, [user]);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const { classes } = props;
  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button onClick={handleLogout}>Logout</Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

export default withStyles(styles)(Home);
