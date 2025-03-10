import httpService from "./HttpServices";
import { useState } from "react";

export default function useApi() {
  const { get } = httpService();
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await get(`/moved`);
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getMovies,
    movies,
  };
}
