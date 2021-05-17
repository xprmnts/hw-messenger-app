import React from 'react';
import { Grid, Box, Typography, SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../../assets/images/bg-img.png';
import { ReactComponent as Logo } from '../../assets/images/bubble.svg';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    minHeight: '60rem',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  imageOverlay: {
    background:
      'linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85));',
    minHeight: '60rem',
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
    margin: '4rem 1rem',
    color: '#FFF'
  }
}));

const AuthBranding = () => {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} className={classes.imageContainer}>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <div className={classes.imageOverlay}>
          <SvgIcon viewBox="0 0 67 67" className={classes.iconRoot}>
            <Logo />
          </SvgIcon>
          <Typography align="center" className={classes.tagLine}>
            Converse with anyone
            <br />
            with any language
          </Typography>
        </div>
      </Box>
    </Grid>
  );
};

export default AuthBranding;
