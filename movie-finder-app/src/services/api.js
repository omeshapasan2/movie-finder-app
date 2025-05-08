const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async (filters = {}) => {
    const { genre, year, rating } = filters;

    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&primary_release_year=${year}`;
    if (rating) url += `&vote_average.gte=${rating}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json()
    return data.results
};

export const searchTVShows = async (query) => {
    if (!token) await authenticateTVDB();
  
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, {
      headers: getHeaders(),
    });
  
    const data = await response.json();
    return data.data; // This contains the TV shows list
};
  