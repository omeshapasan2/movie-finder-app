import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { auth } from "../services/firebase"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"

function MovieCard({movie}) {
    const {isFavourite, addToFavourites, removeFromFavourites} = useMovieContext()
    const favourite = isFavourite(movie.id)

    function onFavouriteClick(e){
        e.preventDefault()

        if (!auth.currentUser) {
            toast.error("You need to be logged in to add movies to your favourites")
            return
        }

        if (favourite) removeFromFavourites(movie.id)
        else addToFavourites(movie)
    }

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    <div className="movie-overlay">
                    <button 
                        className="favourite-btn" 
                        onClick={onFavouriteClick}
                    >
                        {favourite 
                            ? <MdFavorite style={{ color: 'red', fontSize: '24px' }} />
                            : <MdFavoriteBorder style={{ color: 'white', fontSize: '24px' }} />
                        }
                    </button>
                    </div>
                    
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                    <p className="movie-rating-icon">⭐{movie.vote_average.toFixed(1)}</p>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard