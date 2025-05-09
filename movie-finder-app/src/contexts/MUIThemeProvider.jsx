import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const MUIThemeProvider = ({ children }) => {
  const { darkMode } = useTheme();

  // Create a theme based on current mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#F5F5F7',
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',
      },
      primary: {
        main: '#ff4d4d',
      },
      secondary: {
        main: '#f9cb28',
      },
      text: {
        primary: darkMode ? '#FFFFFF' : '#333333',
        secondary: darkMode ? '#B0B0B0' : '#666666',
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
    components: {
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
            background: 'linear-gradient(45deg, #ff4d4d, #f9cb28)',
            '&:hover': {
              background: 'linear-gradient(45deg, #ff3333, #f9c000)',
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
                borderColor: 'rgba(255, 77, 77, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff4d4d',
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
            boxShadow: darkMode 
              ? '0 8px 24px rgba(0, 0, 0, 0.25)' 
              : '0 8px 24px rgba(0, 0, 0, 0.1)',
          }
        }
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(45deg, #ff4d4d, #f9cb28)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;