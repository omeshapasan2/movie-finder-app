import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon
import { useTheme } from '../contexts/ThemeContext'; // Adjust the import path as needed


function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Box sx={{ ml: 1 }}>
      <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          sx={{
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            },
            transition: 'background-color 0.3s',
            borderRadius: '50%',
            p: 1,
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ThemeToggle;