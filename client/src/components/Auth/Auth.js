import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { register, login } from '../../store/utils/thunkCreators';
import AuthBranding from './AuthBranding';
import AuthSecondaryCTA from './AuthSecondaryCTA';
import AuthForm from './AuthForm';

const useStyles = makeStyles((theme) => ({
  authPage: {
    minHeight: '60rem'
  },
  formGrid: {
    flex: 1
  },
  formTitle: {
    fontSize: '2rem',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      fontSize: '1.5rem'
    }
  },
  formWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  formMainContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-15rem',
    width: '75%',
    maxWidth: '30rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '0',
      flexGrow: '0'
    }
  }
}));

const Auth = () => {
  const history = useHistory();
  const isLogin = useLocation().pathname === '/login';
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const formTitleTypography = isLogin ? 'Welcome Back!' : 'Create an account';

  const secondaryCTARouteHandler = () => {
    if (isLogin) {
      history.push('/register');
    } else {
      history.push('/login');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await dispatch(login({ username, password }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }

    await dispatch(register({ username, email, password }));
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.authPage}>
      <AuthBranding />
      <Grid
        item
        container
        xs={12}
        className={classes.formGrid}
        justify="center"
      >
        <Box className={classes.formWrapper}>
          <AuthSecondaryCTA
            loginState={isLogin}
            onSecondaryCTAClick={secondaryCTARouteHandler}
            display={{ xs: 'none', sm: 'block' }}
          />
          <Box className={classes.formMainContainer}>
            <Typography className={classes.formTitle}>
              {formTitleTypography}
            </Typography>

            <AuthForm
              formErrorMessage={formErrorMessage}
              setFormErrorMessage={setFormErrorMessage}
              loginState={isLogin}
              handleRegister={handleRegister}
              handleLogin={handleLogin}
            />
          </Box>
          <AuthSecondaryCTA
            display={{ xs: 'block', sm: 'none' }}
            loginState={isLogin}
            onSecondaryCTAClick={secondaryCTARouteHandler}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auth;
