// App.jsx
import './css/App.css';
import MovieCard from './components/MovieCard';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import { MovieProvider } from './contexts/MovieContext';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieDetails from './pages/MovieDetails';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { useEffect } from 'react';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </MovieProvider>
  );
}

export default App;
