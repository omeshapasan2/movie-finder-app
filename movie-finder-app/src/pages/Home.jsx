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
    const [searchLoading, setSearchLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const [filters, setFilters] = useState({ genre: "", yearStart: "", yearEnd: "", rating: "" });
    const { darkMode } = useTheme();
    const loaderRef = useRef(null);
    const searchTimeout = useRef(null);
    const abortController = useRef(null);
    
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        // Reset pagination
        setPage(1);
        setMovies([]);
        setHasMore(true);
        setShowSeeMore(false);
    };

    // Function to fetch popular movies
    const loadMovies = async (pageNum = 1, reset = false) => {
        if (loading && !reset) return;
        
        // Cancel any ongoing requests
        if (abortController.current) {
            abortController.current.abort();
        }
        
        // Create new abort controller for this request
        abortController.current = new AbortController();
        
        setLoading(true);
        try {
            const newMovies = await getPopularMovies(filters, pageNum, abortController.current.signal);
            
            if (reset) {
                setMovies(newMovies);
            } else {
                setMovies(prev => [...prev, ...newMovies]);
            }
            
            setHasMore(newMovies.length > 0);
            setError(null);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error("Error loading movies:", err);
                setError("Failed to load movies. Please try again.");
            }
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback((query) => {
        // Clear any existing timeout
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        
        // Cancel any ongoing requests
        if (abortController.current) {
            abortController.current.abort();
        }
        
        setSearchLoading(true);
        
        // Set a new timeout
        searchTimeout.current = setTimeout(async () => {
            if (!query.trim()) {
                setSearchLoading(false);
                return;
            }
            
            // Create new abort controller for this request
            abortController.current = new AbortController();
            
            try {
                const results = await searchMovies(query, abortController.current.signal);
                setMovies(results);
                setHasMore(false); // No pagination for search results
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error("Error searching movies:", err);
                    setError("Search failed. Please try again.");
                }
            } finally {
                setSearchLoading(false);
            }
        }, 500); // 500ms delay
    }, []);

    // Initial data load
    useEffect(() => {
        setInitialLoading(true);
        loadMovies(1, true);
        
        return () => {
            // Clean up on unmount
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
            if (abortController.current) {
                abortController.current.abort();
            }
        };
    }, [filters]);

    // Handle scroll event to show "See More" button
    useEffect(() => {
        const checkScroll = () => {
            if (!hasMore || loading || initialLoading || searchLoading) return;
            
            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            const scrollThreshold = pageHeight - 300; // Show button 300px before bottom
            
            setShowSeeMore(scrollPosition >= scrollThreshold);
        };
        
        window.addEventListener('scroll', checkScroll);
        
        // Initial check
        checkScroll();
        
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, [hasMore, loading, initialLoading, searchLoading]);

    const handleLoadMore = () => {
        if (!hasMore || loading) return;
        
        const nextPage = page + 1;
        setPage(nextPage);
        loadMovies(nextPage);
        setShowSeeMore(false);
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        
        if (searchQuery.trim() === "") {
            // Reset to popular movies if search is cleared
            setPage(1);
            setHasMore(true);
            loadMovies(1, true);
            return;
        }
        
        debouncedSearch(searchQuery);
    };

    // Handle input change with immediate feedback
    const handleSearchInputChange = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);
        
        if (newQuery.trim() === "") {
            // Reset to popular movies if search is cleared
            setPage(1);
            loadMovies(1, true);
        } 

        //// Search immediately if query is at least 3 characters without clicking search button

        // else if (newQuery.length >= 3) {
        //     // Only search if query is at least 3 characters
        //     debouncedSearch(newQuery);
        // }
        
    };

    return (
        <div className={`home ${darkMode ? 'dark' : 'light'}`}>
            <SearchBar 
                value={searchQuery}
                onChange={handleSearchInputChange}
                onSubmit={handleSearch}
                loading={searchLoading}
            />
            
            <Filter filters={filters} onChange={handleFilterChange} />
            
            {error && <div className="error-message">{error}</div>}
            
            {initialLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div>Loading movies...</div>
                </div>
            ) : (
                <>
                    {movies.length > 0 ? (
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </div>
                    ) : searchLoading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <div>Searching...</div>
                        </div>
                    ) : (
                        <div className="no-results">No movies found</div>
                    )}
                    
                    {loading && !initialLoading && (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <div>Loading more...</div>
                        </div>
                    )}
                    
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