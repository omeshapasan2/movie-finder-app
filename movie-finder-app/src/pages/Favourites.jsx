import React, { useState, useEffect } from "react";
import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useTheme } from '../contexts/ThemeContext';
import { FaSort, FaSortAlphaDown, FaSortAlphaUp, FaStar, FaCalendarAlt } from 'react-icons/fa';

function Favorites() {
    const { favourites } = useMovieContext();
    const { darkMode } = useTheme();
    const [sortedFavourites, setSortedFavourites] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("default");
    const [sortDirection, setSortDirection] = useState("asc");

    useEffect(() => {
        if (!favourites || favourites.length === 0) {
            setSortedFavourites([]);
            return;
        }

        let sorted = [...favourites];

        switch (sortCriteria) {
            case "title":
                sorted.sort((a, b) => {
                    const titleA = a.title?.toLowerCase() || "";
                    const titleB = b.title?.toLowerCase() || "";
                    return sortDirection === "asc" 
                        ? titleA.localeCompare(titleB) 
                        : titleB.localeCompare(titleA);
                });
                break;
            case "rating":
                sorted.sort((a, b) => {
                    const ratingA = a.vote_average || 0;
                    const ratingB = b.vote_average || 0;
                    return sortDirection === "asc" 
                        ? ratingA - ratingB 
                        : ratingB - ratingA;
                });
                break;
            case "year":
                sorted.sort((a, b) => {
                    const yearA = a.release_date ? parseInt(a.release_date.split("-")[0]) : 0;
                    const yearB = b.release_date ? parseInt(b.release_date.split("-")[0]) : 0;
                    return sortDirection === "asc" 
                        ? yearA - yearB 
                        : yearB - yearA;
                });
                break;
            default:
                // Default sorting - recently added first
                break;
        }

        setSortedFavourites(sorted);
    }, [favourites, sortCriteria, sortDirection]);

    const handleSortChange = (criteria) => {
        if (sortCriteria === criteria) {
            // Toggle direction if clicking the same criteria
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // New criteria, set default direction
            setSortCriteria(criteria);
            setSortDirection("asc");
        }
    };

    const getSortIcon = (criteria) => {
        if (sortCriteria !== criteria) {
            return <FaSort className="sort-icon" />;
        }
        return sortDirection === "asc" 
            ? <FaSortAlphaDown className="sort-icon active" /> 
            : <FaSortAlphaUp className="sort-icon active" />;
    };

    if (!favourites || favourites.length === 0) {
        return (
            <div className={`favorites ${darkMode ? 'dark' : 'light'}`}>
                <h2>Your Favorites</h2>
                <div className="favorites-empty">
                    <h3>No Favorite Movies Yet</h3>
                    <p>Start adding movies to your favorites and they will appear here...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`favorites ${darkMode ? 'dark' : 'light'}`}>
            <h2>Your Favorites</h2>
            
            <div className="sort-controls">
                <span className="sort-label">Sort by:</span>
                <button 
                    className={`sort-button ${sortCriteria === "default" ? "active" : ""}`}
                    onClick={() => setSortCriteria("default")}
                >
                    Recently Added
                </button>
                <button 
                    className={`sort-button ${sortCriteria === "title" ? "active" : ""}`}
                    onClick={() => handleSortChange("title")}
                >
                    Title {getSortIcon("title")}
                </button>
                <button 
                    className={`sort-button ${sortCriteria === "rating" ? "active" : ""}`}
                    onClick={() => handleSortChange("rating")}
                >
                    Rating {getSortIcon("rating")}
                </button>
                <button 
                    className={`sort-button ${sortCriteria === "year" ? "active" : ""}`}
                    onClick={() => handleSortChange("year")}
                >
                    Year {getSortIcon("year")}
                </button>
            </div>
            
            <div className="favorites-count">
                <span>{favourites.length} {favourites.length === 1 ? "movie" : "movies"} in your favorites</span>
            </div>
            
            <div className="movies-grid">
                {sortedFavourites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;