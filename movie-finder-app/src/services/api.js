const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async (filters = {}, page = 1) => {
    const { genre, yearStart, yearEnd, rating } = filters;

    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;

    if (genre) url += `&with_genres=${genre}`;
    if (yearStart) url += `&primary_release_date.gte=${yearStart}-01-01`;
    if (yearEnd) url += `&primary_release_date.lte=${yearEnd}-12-31`;
    if (rating) url += `&vote_average.gte=${rating}`;

    const response = await fetch(url);
    const data = await response.json();

    // Filter out adult movies
    const filteredMovies = data.results.filter(movie => !movie.adult);

    return filteredMovies;
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