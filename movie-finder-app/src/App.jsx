import './css/App.css';
import MovieCard from './components/MovieCard';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import { MovieProvider } from './contexts/MovieContext';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favourites" element={<Favourites />}/>
        </Routes>
      </main>
    </MovieProvider>
  )
  
}

export default App
