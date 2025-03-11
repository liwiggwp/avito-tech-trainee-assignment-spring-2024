import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import DefaultImage from "../Assets/placeholder.jpg";
import { Link } from "react-router-dom";

const CardMovie = ({ movies }) => {
  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Фильмы
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {movies.map((movie) => {
          return (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card component={Link} to={`/${movie.id}`}>
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.poster?.previewUrl || DefaultImage}
                  alt={movie.name || movie.alternativeName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.name || movie.alternativeName}
                  </Typography>
                  <Typography variant="body2">Год: {movie.year}</Typography>
                  <Typography variant="body2">
                    Рейтинг IMDb: {movie.rating.imdb}
                  </Typography>
                  <Typography variant="body2">
                    Жанр:
                    {movie.genres?.map((genre) => genre.name).join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    Страна:
                    {movie.countries?.map((country) => country.name).join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    Длительность: {movie.movieLength}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CardMovie;
