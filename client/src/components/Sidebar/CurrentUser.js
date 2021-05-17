import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BadgeAvatar } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { logout } from '../../store/utils/thunkCreators';
import { clearOnLogout } from '../../store/index';

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: 'flex',
    alignItems: 'center'
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 17
  },
  ellipsis: {
    color: '#95A7C4',
    marginRight: 24,
    opacity: 0.5
  }
}));

const CurrentUser = () => {
  const user = useSelector((state) => state.user) || {};
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout(user.id));
    dispatch(clearOnLogout());
    history.push('/login');
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <Button onClick={handleMenuClick}>
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </Button>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClick}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default CurrentUser;
