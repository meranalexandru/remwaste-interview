import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1B4332', // Deep industrial green
      light: '#2D6A4F', // Medium industrial green
      dark: '#081C15', // Darkest industrial green
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#40916C', // Bright accent green
      light: '#74C69D', // Light accent green
      dark: '#2D6A4F', // Dark accent green
      contrastText: '#ffffff',
    },
    background: {
      default: '#081C15', // Very dark green background
      paper: '#1B4332', // Slightly lighter green for cards
    },
    success: {
      main: '#40916C', // Bright green for success states
    },
    text: {
      primary: '#ffffff',
      secondary: '#B7E4C7', // Light green for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#74C69D', // Bright green for main heading
      fontWeight: 600,
    },
    h2: {
      color: '#74C69D',
    },
    h3: {
      color: '#74C69D',
    },
    h4: {
      color: '#74C69D',
    },
    h5: {
      color: '#74C69D',
    },
    h6: {
      color: '#74C69D',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B4332',
          border: '1px solid #2D6A4F',
          '&:hover': {
            borderColor: '#40916C',
            boxShadow: '0 0 15px rgba(64, 145, 108, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-colorSuccess': {
            backgroundColor: '#2D6A4F',
            color: '#B7E4C7',
          },
          '&.MuiChip-colorPrimary': {
            backgroundColor: '#2D6A4F',
            color: '#B7E4C7',
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: '#2D6A4F',
            color: '#B7E4C7',
          },
        },
      },
    },
  },
}); 