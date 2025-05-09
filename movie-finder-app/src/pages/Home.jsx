import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api"; 
import "../css/Home.css"
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({ genre: "", yearStart: "", yearEnd: "", rating: "" });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };


    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const filteredMovies = await getPopularMovies(filters);
                setMovies(filteredMovies);
                setError(null);
            } catch (err) {
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };
    
        fetchMovies();
    }, [filters]);
      

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }catch{
            console.log(err)
            setError("Failed to search movies...")
        }finally{
            setLoading(false)
        }

        // setSearchQuery("");
    };

    return (
        <div className="home">
            <SearchBar 
                value = {searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={handleSearch}
            />
            <Filter filters={filters} onChange={handleFilterChange} />
            {error && <div className="error-message">{error}</div>}
        
            {loading ? (
                <div className="loading">Loading...</div>
            ) :  (
                <div className="movies-grid">
                    {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home