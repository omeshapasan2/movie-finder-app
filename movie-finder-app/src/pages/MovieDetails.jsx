import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MovieDetails.css';
import { useTheme } from '../contexts/ThemeContext';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        ]);

        setMovie(detailsRes.data);
        setCast(creditsRes.data.cast.slice(0, 6)); // show top 6 cast
        const trailer = videosRes.data.results.find(video => video.site === "YouTube" && video.type === "Trailer");
        setTrailerKey(trailer?.key);
      } catch (err) {
        console.error("Error loading movie details", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, API_KEY]);

  if (loading) {
    return (
      <div className={`movie-details-container ${darkMode ? 'dark' : 'light'}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={`movie-details-container ${darkMode ? 'dark' : 'light'}`}>
        <div className="movie-details-paper">
          <h2>Movie not found</h2>
          <Link to="/" className="back-button">Back to Movies</Link>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={`movie-details-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="movie-details-paper">
        <div className="movie-details-header">
          <h1 className="movie-title">{movie.title}</h1>
          {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}
        </div>

        <div className="movie-content">
          <div className="movie-poster">
            {movie.poster_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={`${movie.title} poster`}
              />
            ) : (
              <div className="no-poster">No poster available</div>
            )}
            <div className="movie-rating">{movie.vote_average.toFixed(1)}</div>
          </div>

          <div className="movie-info">
            <div className="info-section">
              <h3 className="section-title">Overview</h3>
              <p className="movie-overview">{movie.overview || 'No overview available.'}</p>
            </div>

            <div className="info-section">
              <h3 className="section-title">Details</h3>
              <div className="movie-meta">
                <span className="meta-item">
                  <strong>Release:</strong> {formatDate(movie.release_date)}
                </span>
                <span className="meta-item">
                  <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
                </span>
                {movie.budget > 0 && (
                  <span className="meta-item">
                    <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                  </span>
                )}
                {movie.revenue > 0 && (
                  <span className="meta-item">
                    <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                  </span>
                )}
              </div>

              <h3 className="section-title">Genres</h3>
              <div className="genres">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3 className="section-title">Cast</h3>
              {cast.length > 0 ? (
                <ul className="cast-list">
                  {cast.map(actor => (
                    <li key={actor.cast_id} className="cast-item">
                      {actor.profile_path ? (
                        <div className="cast-image">
                          <img 
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                            alt={actor.name}
                          />
                        </div>
                      ) : (
                        <div className="cast-image no-profile">
                          <span>{actor.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="cast-name">{actor.name}</div>
                      <div className="cast-character">as {actor.character}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No cast information available.</p>
              )}
            </div>
          </div>
        </div>

        {trailerKey && (
          <div className="trailer-container">
            <h3 className="section-title">Trailer</h3>
            <div className="trailer-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <Link to="/" className="back-button">
          <span>← Back to Movies</span>
        </Link>
      </div>
    </div>
  );
}

export default MovieDetails;