import MovieCard from "../components/MovieCard";
import { useState, useEffect, useRef, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api"; 
import "../css/Home.css"
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { useTheme } from '../contexts/ThemeContext';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const [filters, setFilters] = useState({ genre: "", yearStart: "", yearEnd: "", rating: "" });
    const { darkMode } = useTheme();
    const loaderRef = useRef(null);
    const scrollListener = useRef(null);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        // Reset pagination
        setPage(1);
        setMovies([]);
        setHasMore(true);
        setShowSeeMore(false);
    };

    // Function to fetch movies
    const loadMovies = async (pageNum = 1, isSearch = false, reset = false) => {
        if (loading) return;
        
        setLoading(true);
        try {
            let newMovies;
            
            if (isSearch && searchQuery.trim()) {
                newMovies = await searchMovies(searchQuery);
                setHasMore(false); // No pagination for search results
            } else {
                newMovies = await getPopularMovies(filters, pageNum);
                setHasMore(newMovies.length > 0);
            }
            
            if (reset) {
                setMovies(newMovies);
            } else {
                setMovies(prev => [...prev, ...newMovies]);
            }
            
            setError(null);
        } catch (err) {
            console.error("Error loading movies:", err);
            setError("Failed to load movies");
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    // Initial data load
    useEffect(() => {
        setInitialLoading(true);
        loadMovies(1, false, true);
    }, [filters]);

    // Handle scroll event to show "See More" button
    useEffect(() => {
        const checkScroll = () => {
            if (!hasMore || loading || initialLoading) return;
            
            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            const scrollThreshold = pageHeight - 300; // Show button 300px before bottom
            
            setShowSeeMore(scrollPosition >= scrollThreshold);
        };
        
        scrollListener.current = checkScroll;
        window.addEventListener('scroll', checkScroll);
        
        // Initial check
        checkScroll();
        
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, [hasMore, loading, initialLoading]);

    const handleLoadMore = () => {
        if (!hasMore || loading) return;
        
        const nextPage = page + 1;
        setPage(nextPage);
        loadMovies(nextPage);
        setShowSeeMore(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;
        
        setPage(1);
        loadMovies(1, true, true);
    };

    return (
        <div className={`home ${darkMode ? 'dark' : 'light'}`}>
            <SearchBar 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={handleSearch}
            />
            <Filter filters={filters} onChange={handleFilterChange} />
            
            {error && <div className="error-message">{error}</div>}
            
            {initialLoading ? (
                <div className="loading">Loading movies...</div>
            ) : (
                <>
                    {movies.length > 0 ? (
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">No movies found</div>
                    )}
                    
                    {loading && <div className="loading">Loading more...</div>}
                    
                    {showSeeMore && hasMore && (
                        <div className="see-more-container" ref={loaderRef}>
                            <button 
                                className="see-more-button"
                                onClick={handleLoadMore}
                                disabled={loading}
                            >
                                See More Movies
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;