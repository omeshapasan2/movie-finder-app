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

function App() {

  return (
    <ThemeProvider>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/favourites" element={<Favourites />}/>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
      </MovieProvider>
    </ThemeProvider>
  )
  
}

export default App
