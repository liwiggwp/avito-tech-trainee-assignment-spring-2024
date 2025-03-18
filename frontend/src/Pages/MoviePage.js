import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Box } from "@mui/material";
import Api from "../Services/ApiRequest";
import Header from "../Components/header/Header";
import MovieCarousel from "../Components/catalog/MovieCarousel";
import Review from "../Components/review/Review";
import MovieDetails from "../Components/movie/MovieDetails";
import MovieRatingAndActors from "../Components/movie/MovieRatingAndActors";
import MovieTrailer from "../Components/movie/MovieTrailer";
const MoviePage = () => {
  const { id } = useParams();
  const { movie, getMovieById, getReviews } = Api();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieById(id);

    const fetchReviews = async () => {
      const response = await getReviews(id, 1, 10);
      if (response) {
        setReviews(response.reviews);
      }
    };
    fetchReviews();
  }, [id]);

  return (
    <>
      <Header />
      <Box
        sx={{
          position: "relative",
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${movie?.backdrop?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mt: 10,
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))`,
            minHeight: "100vh",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                sx={{ width: "100%" }}
                src={movie?.poster?.url}
                alt={movie?.poster?.url}
              />

              <MovieTrailer movie={movie} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MovieDetails movie={movie} />
            </Grid>
            <Grid item xs={12} md={3}>
              <MovieRatingAndActors movie={movie} />
            </Grid>
            <Grid item xs={12}>
              {movie?.sequelsAndPrequels?.length > 0 && (
                <MovieCarousel
                  name={"Сиквелы, приквелы и ремейки"}
                  movies={movie.sequelsAndPrequels}
                />
              )}
            </Grid>
          </Grid>
          <Review reviews={reviews} />
        </Container>
      </Box>
    </>
  );
};

export default MoviePage;
