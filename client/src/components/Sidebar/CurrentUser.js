import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import { useSelector } from 'react-redux';
=======
import { useSelector, useDispatch } from 'react-redux';
>>>>>>> logOutDropdown
import { BadgeAvatar } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { logout } from '../../store/utils/thunkCreators';

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
<<<<<<< HEAD
  const classes = useStyles();
  const user = useSelector((state) => state.user) || {};
=======
  const user = useSelector((state) => state.user) || {};
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  };

  const handleLogout = async (e) => {
    await dispatch(logout(user.id));
  };
>>>>>>> logOutDropdown

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
