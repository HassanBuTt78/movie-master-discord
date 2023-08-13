const axios = require("axios");
const {shuffleArray} = require("../utils/arrayHelper")

const movieById = async (movieId) => {
  const apiUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return response.data.data.movie;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error(`Failed to fetch data from API: ${error.message}`);
  }
};

const query = async (query = "", limit = 20, page = 1, genre = "") => {
  const apiUrl = `https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}&query_term=${query}&genre=${genre}&sort_by=download_count`;
  try {
    const response = await axios.get(apiUrl);
    if(response.status != 200) return {error : "Error 500! There has been a error in server"}
    if(response.data.data.movie_count == 0) return {error: `No Result for ${query} - double check movie name and spelling.`}
    return response.data.data.movies
  } catch (error) {
    console.error(`Failed to fetch data from API: ${error.message}`);
  }
};

const getMoviesWithMost = async (sort, _limit = 4) => {
  const apiUrl = `https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&limit=${_limit}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return response.data.data.movies;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error(`Failed to fetch data from API: ${error.message}`);
  }
};

const getSimilarMovies = async (_id) => {
  const apiUrl = ` https://yts.mx/api/v2/movie_suggestions.json?movie_id=${_id}`;
  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return response.data.data.movies;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error(`Failed to fetch data from API: ${error.message}`);
  }
};


const getPopularMovies = async (_limit = 20) => {
    const apiUrl = `https://yts.mx/api/v2/list_movies.json?sort_by=download_count&limit=${_limit}&query_term=2023`;
  
    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        const movies = response.data.data.movies;
        shuffleArray(movies)
        return movies.slice(0,4);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error(`Failed to fetch data from API: ${error.message}`);
    }
  };

module.exports = {
  movieById,
  query,
  getMoviesWithMost,
  getSimilarMovies,
  getPopularMovies
};