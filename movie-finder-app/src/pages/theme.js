// theme.js - Enhanced with both dark and light themes
import { createTheme, alpha } from '@mui/material/styles';

// Base styling configurations that will be shared between themes
const getBaseComponents = (mode, colors) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        padding: '10px 16px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      },
      containedPrimary: {
        background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
        '&:hover': {
          background: `linear-gradient(45deg, ${colors.primaryDark}, ${colors.secondaryDark})`,
        }
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 6,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(colors.primary, 0.5),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
            borderWidth: 2,
          }
        }
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    }
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? alpha('#ffffff', 0.7) : alpha('#000000', 0.7),
        '&.Mui-checked': {
          color: colors.primary,
        }
      }
    }
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none',
        fontWeight: 500,
        '&:hover': {
          textDecoration: 'underline',
        }
      }
    }
  }
});

// Your original theme (dark mode)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#ff4d4d',
    },
    secondary: {
      main: '#f9cb28',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 8
  },
  components: getBaseComponents('dark', {
    primary: '#ff4d4d',
    primaryDark: '#ff3333',
    secondary: '#f9cb28',
    secondaryDark: '#f9c000'
  })
});

// New light theme variant
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    primary: {
      main: '#ff4d4d',
    },
    secondary: {
      main: '#f9cb28',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 8
  },
  components: getBaseComponents('light', {
    primary: '#ff4d4d',
    primaryDark: '#e03e3e',
    secondary: '#f9cb28',
    secondaryDark: '#e0b800'
  })
});

// For backward compatibility - export the dark theme as the default theme
export const theme = darkTheme;