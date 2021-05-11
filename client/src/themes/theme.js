import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 14,
        button: {
            textTransform: 'none',
            letterSpacing: 0,
            fontWeight: 'bold'
        }
    },
    overrides: {
        MuiInput: {
            input: {
                fontWeight: 'bold'
            }
        },
        MuiButton: {
            sizeLarge: {
                margin: '0rem 3rem',
                padding: '0.75rem 3rem'
            }
        }
    },
    palette: {
        primary: { main: '#3A8DFF' },
        secondary: { main: '#B0B0B0' }
    }
});
