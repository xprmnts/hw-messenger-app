import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    authPrimaryCTA: {
        backgroundColor: '#3A8DFF',
        color: '#FFF'
    },
    authSecondaryCTA: {
        backgroundColor: '#FFF',
        boxShadow: [
            '4px 4px 5px 0px rgba(0,0,0,0.1)',
            '-4px -4px 5px 0px rgba(0,0,0,0.1)'
        ].join(','),
        color: '#3A8DFF',
        '&:hover': {
            backgroundColor: '#f7f7f7'
        }
    }
};

const AuthButton = props => {
    return (
        <Button
            type={props.type || ''}
            variant='contained'
            size='large'
            className={
                props.type
                    ? `${props.classes.authPrimaryCTA}`
                    : `${props.classes.authSecondaryCTA}`
            }
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

export default withStyles(styles)(AuthButton);
