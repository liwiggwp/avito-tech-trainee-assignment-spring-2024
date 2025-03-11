import httpService from "./HttpServices";
import { useState } from "react";

export default function useApi() {
  const { get } = httpService();
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);

  const getMovies = async () => {
    try {
      const response = await get(`/movie`);
      setMovies(response.data[0]);
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
  return {
    getMovies,
    getMovieById,
    movies,
    movie,
  };
}
