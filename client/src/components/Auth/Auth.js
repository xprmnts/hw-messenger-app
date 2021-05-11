import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid,
    Box,
    Typography,
    FormControl,
    TextField,
    FormHelperText,
    SvgIcon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { register, login } from '../../store/utils/thunkCreators';
import AuthButton from './AuthButton';
import BackgroundImage from '../../assets/images/bg-img.png';
import { ReactComponent as Logo } from '../../assets/images/bubble.svg';

const styles = theme => ({
    imageContainer: {
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    imageOverlay: {
        background:
            'linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85));',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconRoot: {
        width: '6rem',
        height: '6rem',
        marginTop: '-15rem'
    },
    tagLine: {
        fontSize: '2rem',
        marginTop: '4rem',
        color: '#FFF'
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
    //const [isLogin, setIsLogin] = useState(true); //placeholder logic while testing
    const { user, register } = props;
    const [formErrorMessage, setFormErrorMessage] = useState({});

    const secondaryCTAText = isLogin
        ? 'Already have an account?'
        : 'Need to log in?';

    const secondaryCTAButtonText = isLogin ? 'Create Account' : 'Login';

    const secondaryCTARouteHandler = () => {
        if (isLogin) {
            history.push('/register');
            setIsLogin(false);
        } else {
            history.push('/login');
            setIsLogin(true);
        }
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
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                className={props.classes.imageContainer}
            >
                <Box display={{ xs: 'none', sm: 'block' }}>
                    <div className={props.classes.imageOverlay}>
                        <SvgIcon
                            viewBox='0 0 67 67'
                            className={props.classes.iconRoot}
                        >
                            <Logo />
                        </SvgIcon>
                        <Typography
                            align='center'
                            className={props.classes.tagLine}
                        >
                            Converse with anyone
                            <br />
                            with any language
                        </Typography>
                    </div>
                </Box>
            </Grid>

            <Grid
                item
                container
                xs={12}
                className={props.classes.formGrid}
                justify='center'
            >
                <Box className={props.classes.formWrapper}>
                    <Box
                        display={{ xs: 'none', sm: 'block' }}
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
                    <Box className={props.classes.formMainContainer}>
                        <Typography className={props.classes.formTitle}>
                            Create an account
                        </Typography>

                        <form onSubmit={handleRegister}>
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
                                            {formErrorMessage.confirmPassword}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <AuthButton type='submit'>Create</AuthButton>
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
                                Need to log in?
                            </Typography>

                            <AuthButton onClick={() => history.push('/login')}>
                                Login
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Auth));
