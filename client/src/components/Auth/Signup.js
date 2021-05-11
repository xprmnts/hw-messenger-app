import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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
import { register } from '../../store/utils/thunkCreators';
import AuthButton from './AuthButton';
import BackgroundImage from '../../assets/images/bg-img.png';

const styles = {
    backgroundContainer: {
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    formContainer: {
        flex: 1
    }
};

const Signup = props => {
    const history = useHistory();
    const { user, register } = props;
    const [formErrorMessage, setFormErrorMessage] = useState({});

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
                className={props.classes.backgroundContainer}
            />

            <Grid
                container
                className={props.classes.formContainer}
                justify='center'
            >
                <Box>
                    <Grid container item>
                        <Typography>Need to log in?</Typography>
                        <AuthButton onClick={() => history.push('/login')}>
                            Login
                        </AuthButton>
                    </Grid>
                    <form onSubmit={handleRegister}>
                        <Grid>
                            <Grid>
                                <FormControl>
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
                                <FormControl>
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
                                    error={!!formErrorMessage.confirmPassword}
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
                                    error={!!formErrorMessage.confirmPassword}
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
)(withStyles(styles)(Signup));
