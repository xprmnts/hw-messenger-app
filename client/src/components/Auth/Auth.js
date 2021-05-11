import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid,
    Box,
    Typography,
    FormControl,
    TextField,
    FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { register, login } from '../../store/utils/thunkCreators';
import AuthButton from './AuthButton';
import AuthBranding from './AuthBranding';
import AuthSecondaryCTA from './AuthSecondaryCTA';

const styles = theme => ({
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
    secondaryCTAWrapper: {
        width: '100%'
    },
    secondaryCTAContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
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

const Auth = props => {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(
        useLocation().pathname === '/login' ? true : false
    );

    const { user, register, login } = props;
    const [formErrorMessage, setFormErrorMessage] = useState({});

    const secondaryCTAText = isLogin
        ? 'Already have an account?'
        : 'Need to log in?';

    const secondaryCTAButtonText = isLogin ? 'Create Account' : 'Login';

    const formSubmitButtonText = isLogin ? 'Login' : 'Create';

    const formTitleTypography = isLogin ? 'Welcome Back!' : 'Create an account';

    const secondaryCTARouteHandler = () => {
        if (isLogin) {
            history.push('/register');
            setIsLogin(false);
        } else {
            history.push('/login');
            setIsLogin(true);
        }
    };

    const handleLogin = async event => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        await login({ username, password });
    };

    const handleRegister = async event => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setFormErrorMessage({ confirmPassword: 'Passwords must match' });
            return;
        }

        await register({ username, email, password });
    };

    if (user.id) {
        return <Redirect to='/home' />;
    }

    return (
        <Grid container component='main'>
            <AuthBranding />
            <Grid
                item
                container
                xs={12}
                className={props.classes.formGrid}
                justify='center'
            >
                <Box className={props.classes.formWrapper}>
                    <AuthSecondaryCTA
                        loginState={isLogin}
                        onSecondaryCTAClick={secondaryCTARouteHandler}
                    />
                    <Box className={props.classes.formMainContainer}>
                        <Typography className={props.classes.formTitle}>
                            {formTitleTypography}
                        </Typography>

                        <form onSubmit={isLogin ? handleLogin : handleRegister}>
                            <Grid
                                container
                                className={props.classes.formLayout}
                            >
                                <Grid>
                                    <FormControl
                                        fullWidth
                                        className={
                                            props.classes.formInputStyling
                                        }
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
                                            className={
                                                props.classes.formInputStyling
                                            }
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
                                        error={
                                            !!formErrorMessage.confirmPassword
                                        }
                                        className={
                                            props.classes.formInputStyling
                                        }
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
                                            {formErrorMessage.confirmPassword}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid>
                                    {!isLogin && (
                                        <FormControl
                                            fullWidth
                                            className={
                                                props.classes.formInputStyling
                                            }
                                            error={
                                                !!formErrorMessage.confirmPassword
                                            }
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
                                                {
                                                    formErrorMessage.confirmPassword
                                                }
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                </Grid>
                                <AuthButton type='submit'>
                                    {formSubmitButtonText}
                                </AuthButton>
                            </Grid>
                        </form>
                    </Box>
                    <Box
                        display={{ xs: 'block', sm: 'none' }}
                        className={props.classes.secondaryCTAWrapper}
                    >
                        <Grid
                            container
                            item
                            className={props.classes.secondaryCTAContainer}
                        >
                            <Typography color='secondary'>
                                {secondaryCTAText}
                            </Typography>

                            <AuthButton onClick={secondaryCTARouteHandler}>
                                {secondaryCTAButtonText}
                            </AuthButton>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: credentials => {
            dispatch(register(credentials));
        },
        login: credentials => {
            dispatch(login(credentials));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Auth));
