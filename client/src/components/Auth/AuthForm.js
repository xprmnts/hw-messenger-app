import React from 'react';
import {
  Grid,
  FormControl,
  TextField,
  FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthButton from './AuthButton';

const useStyles = makeStyles((theme) => ({
  formLayout: {
    flexDirection: 'column'
  },

  formInputStyling: {
    margin: '0.75rem 0rem'
  }
}));

const AuthForm = (props) => {
  const classes = useStyles();
  const isLogin = props.loginState;

  const formSubmitButtonText = isLogin ? 'Login' : 'Create';

  return (
    <form onSubmit={isLogin ? props.handleLogin : props.handleRegister}>
      <Grid container className={classes.formLayout}>
        <Grid>
          <FormControl fullWidth className={classes.formInputStyling}>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              autoComplete="on"
              type="text"
              required
            />
          </FormControl>
        </Grid>
        <Grid>
          {!isLogin && (
            <FormControl fullWidth className={classes.formInputStyling}>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                autoComplete="on"
                required
              />
            </FormControl>
          )}
        </Grid>
        <Grid>
          <FormControl
            fullWidth
            error={!!props.formErrorMessage.confirmPassword}
            className={classes.formInputStyling}
          >
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              autoComplete="on"
              required
            />
            <FormHelperText>
              {props.formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid>
          {!isLogin && (
            <FormControl
              fullWidth
              className={classes.formInputStyling}
              error={!!props.formErrorMessage.confirmPassword}
            >
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                autoComplete="on"
                required
              />
              <FormHelperText>
                {props.formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>
        <AuthButton type="submit">{formSubmitButtonText}</AuthButton>
      </Grid>
    </form>
  );
};

export default AuthForm;
