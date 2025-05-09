import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import '../css/ThemeToggle.css';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button 
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`} 
      onClick={toggleTheme} 
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
      <span className="toggle-text">{darkMode ? 'Light' : 'Dark'}</span>
    </button>
  );
}

export default ThemeToggle;