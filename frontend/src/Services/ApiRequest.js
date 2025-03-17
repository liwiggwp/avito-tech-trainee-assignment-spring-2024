import httpService from "./HttpServices";
import { useState } from "react";

export default function useApi() {
  const { get } = httpService();
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [categories, setCategories] = useState([]);

  const getMovies = async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await get(`/movie?${queryString}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async (field) => {
    try {
      const response = await get(
        `/movie/possible-values-by-field?field=${field}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = async (query) => {
    try {
      const queryString = new URLSearchParams({ query }).toString();
      const response = await get(`/movie/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieById = async (id) => {
    try {
      const response = await get(`/movie/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async (movieId, page = 1, limit = 10) => {
    try {
      const queryString = new URLSearchParams({
        movieId,
        page,
        limit,
      }).toString();
      const response = await get(`/review?${queryString}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    getMovies,
    getMovieById,
    getCategories,
    getReviews,
    getSearch,
    movies,
    movie,
    categories,
  };
}
