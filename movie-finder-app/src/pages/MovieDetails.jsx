import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [trailerKey, setTrailerKey] = useState(null)

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    async function fetchData() {
      try {
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        ])

        setMovie(detailsRes.data)
        setCast(creditsRes.data.cast.slice(0, 5)) // show top 5 cast
        const trailer = videosRes.data.results.find(video => video.site === "YouTube" && video.type === "Trailer")
        setTrailerKey(trailer?.key)
      } catch (err) {
        console.error("Error loading movie details", err)
      }
    }

    fetchData()
  }, [id])

  if (!movie) return <p>Loading...</p>

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>

      <h3>Cast</h3>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>{actor.name} as {actor.character}</li>
        ))}
      </ul>

      {trailerKey && (
        <>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </>
      )}
    </div>
  )
}

export default MovieDetails