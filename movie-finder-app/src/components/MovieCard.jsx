import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { auth } from "../services/firebase"
import { toast } from "react-toastify"

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

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button 
                    className="favourite-btn" 
                    onClick={onFavouriteClick}
                >
                    <img 
                    src={favourite 
                        ? "https://img.icons8.com/?size=100&id=mah7DGc4GwAU&format=png&color=646CFF"
                        : "https://img.icons8.com/?size=100&id=mah7DGc4GwAU&format=png&color=FFFFFF"} 
                    alt="Favourite Icon" 
                    className="favourite-icon"
                    />
                </button>
            </div>
            
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard