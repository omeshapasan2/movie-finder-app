import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { useTheme } from '../contexts/ThemeContext';
import '../css/Trending.css';

function Trending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
        setError('Failed to load trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className={`trending-container ${darkMode ? 'dark' : 'light'}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div>Loading trending movies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`trending-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="trending-header">
        <h1>Trending Movies</h1>
        <p>Discover what's popular in the world of movies right now</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="no-results">No trending movies found</div>
      )}
    </div>
  );
}

export default Trending;