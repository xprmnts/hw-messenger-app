import React from 'react';
import {
    Grid,
    FormControl,
    TextField,
    FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AuthButton from './AuthButton';

const styles = theme => ({
    authPage: {
        minHeight: '60rem'
    },
    formGrid: {
        flex: 1
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
        [theme.breakpoints.down('xs')]: {
            marginTop: '0',
            flexGrow: '0'
        }
    },
    formTitle: {
        fontSize: '2rem',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },
    formLayout: {
        flexDirection: 'column'
    },

    formInputStyling: {
        margin: '0.75rem 0rem'
    }
});

const AuthForm = props => {
    const isLogin = props.loginState;

    const formSubmitButtonText = isLogin ? 'Login' : 'Create';

    return (
        <form onSubmit={isLogin ? props.handleLogin : props.handleRegister}>
            <Grid container className={props.classes.formLayout}>
                <Grid>
                    <FormControl
                        fullWidth
                        className={props.classes.formInputStyling}
                    >
                        <TextField
                            aria-label='username'
                            label='Username'
                            name='username'
                            type='text'
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid>
                    {!isLogin && (
                        <FormControl
                            fullWidth
                            className={props.classes.formInputStyling}
                        >
                            <TextField
                                label='E-mail address'
                                aria-label='e-mail address'
                                type='email'
                                name='email'
                                required
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid>
                    <FormControl
                        fullWidth
                        error={!!props.formErrorMessage.confirmPassword}
                        className={props.classes.formInputStyling}
                    >
                        <TextField
                            aria-label='password'
                            label='Password'
                            type='password'
                            inputProps={{ minLength: 6 }}
                            name='password'
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
                            className={props.classes.formInputStyling}
                            error={!!props.formErrorMessage.confirmPassword}
                        >
                            <TextField
                                label='Confirm Password'
                                aria-label='confirm password'
                                type='password'
                                inputProps={{ minLength: 6 }}
                                name='confirmPassword'
                                required
                            />
                            <FormHelperText>
                                {props.formErrorMessage.confirmPassword}
                            </FormHelperText>
                        </FormControl>
                    )}
                </Grid>
                <AuthButton type='submit'>{formSubmitButtonText}</AuthButton>
            </Grid>
        </form>
    );
};

export default withStyles(styles)(AuthForm);
