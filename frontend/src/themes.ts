import { createTheme } from '@mui/material/styles';

// Light theme configuration
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

// Dark theme configuration
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#ce93d8',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        backgroundColor: '#1d1d1d', // Different background for input fields
                        color: '#ffffff', // White text color
                        borderRadius: '4px',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#6c757d', // Border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#90caf9', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ffffff', // Border color on focus
                        },
                    },
                },
            },
        },
    },
});
