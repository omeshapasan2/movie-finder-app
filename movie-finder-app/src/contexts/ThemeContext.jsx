import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme preference or use dark as default
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme !== null ? JSON.parse(savedTheme) : true; // Default to dark mode
  });

  // Update local storage when theme changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Update body class for global styling
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Context value to be provided
  const value = {
    darkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};