import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (filters = {}, page = 1) => {
  const { genre, yearStart, yearEnd, rating } = filters;

  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;

  if (genre) url += `&with_genres=${genre}`;
  if (yearStart) url += `&primary_release_date.gte=${yearStart}-01-01`;
  if (yearEnd) url += `&primary_release_date.lte=${yearEnd}-12-31`;
  if (rating) url += `&vote_average.gte=${rating}`;

  try {
    const response = await axios.get(url);
    // Filter out adult movies
    const filteredMovies = response.data.results.filter(movie => !movie.adult);
    return filteredMovies;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async (page = 1) => {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`;

    try {
        const response = await axios.get(url);
        // Filter out adult movies
        const filteredMovies = response.data.results.filter(movie => !movie.adult);
        return filteredMovies;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};
  