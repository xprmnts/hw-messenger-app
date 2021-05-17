import socket from '../socket';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CssBaseline, Button } from '@material-ui/core';
import { SidebarContainer } from './Sidebar';
import { ActiveChat } from './ActiveChat';
import { logout, fetchConversations } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/index';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '97vh',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  }
}));

const Home = (props) => {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
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
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

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

export default Home;
