import React, { useEffect } from "react";
import Api from "../Services/ApiRequest";
import CardMovie from "../Components/CardMovie";

export default function HOME() {
  const { movies, getMovies } = Api();
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      <h1>Home</h1>
      <CardMovie movies={movies}/>
    </div>
  );
}
