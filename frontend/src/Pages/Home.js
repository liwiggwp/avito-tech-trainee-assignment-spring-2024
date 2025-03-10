import React, { useEffect } from "react";
import Api from "../Services/ApiRequest";

export default function HOME() {
  const { movies, getMovies } = Api();
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
