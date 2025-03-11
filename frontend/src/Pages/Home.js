import React, { useEffect } from "react";
import Api from "../Services/ApiRequest";
import CardMovie from "../Components/CardMovie";
import Header from "../Components/header/Header";

export default function HOME() {
  const { movies, getMovies } = Api();
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      <Header />
      <CardMovie movies={movies}/>
    </div>
  );
}
