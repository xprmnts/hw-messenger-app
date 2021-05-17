import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authPrimaryCTA: {
    backgroundColor: '#3A8DFF',
    color: '#FFF',
    alignSelf: 'center'
  },
  authSecondaryCTA: {
    backgroundColor: '#FFF',
    boxShadow: '4px 4px 5px 0px rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.05)',
    color: '#3A8DFF',
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  }
}));

const AuthButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      type={props.type || ''}
      variant="contained"
      size="large"
      className={
        props.type ? `${classes.authPrimaryCTA}` : `${classes.authSecondaryCTA}`
      }
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default AuthButton;
