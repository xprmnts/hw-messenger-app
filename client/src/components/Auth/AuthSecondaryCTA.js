import React from 'react';

import { Grid, Box, Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import AuthButton from './AuthButton';

const styles = theme => ({
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
    }
});

const AuthSecondaryCTA = props => {
    const isLogin = props.loginState;

    const secondaryCTAText = isLogin
        ? 'Already have an account?'
        : 'Need to log in?';

    const secondaryCTAButtonText = isLogin ? 'Create Account' : 'Login';

    return (
        <Box
            display={props.display}
            className={props.classes.secondaryCTAWrapper}
        >
            <Grid
                container
                item
                className={props.classes.secondaryCTAContainer}
            >
                <Typography color='secondary'>{secondaryCTAText}</Typography>

                <AuthButton onClick={props.onSecondaryCTAClick}>
                    {secondaryCTAButtonText}
                </AuthButton>
            </Grid>
        </Box>
    );
};

export default withStyles(styles)(AuthSecondaryCTA);
