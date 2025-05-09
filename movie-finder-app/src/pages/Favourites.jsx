import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"
import { useTheme } from '../contexts/ThemeContext';

function Favourites() {
    const {favourites} = useMovieContext();
    const { darkMode } = useTheme();

    if(favourites && favourites.length > 0){
        return (
            <div className={`favourites ${darkMode ? 'dark' : 'light'}`}>
                <h2>Your Favourites</h2>
                <div className="movies-grid">
                    {favourites.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return <div className={`favourites-empty ${darkMode ? 'dark' : 'light'}`}>
        <h2>No Favourite Movies Yet</h2>
        <p>Start adding movies to your favourites and they will appear here...</p>
    </div>
}

export default Favourites