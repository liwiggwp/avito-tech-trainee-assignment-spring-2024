import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import Api from "../Services/ApiRequest";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, getMovieById } = Api();

  useEffect(() => {
    getMovieById(id);
  }, [id]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ backgroundColor: "#fff" }}>
              <CardMedia
                component="img"
                image={movie?.poster?.url}
                alt={movie?.poster?.url}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold">
              {movie?.name}
            </Typography>
            <Typography variant="subtitle1" color="gray">
              {movie?.alternativeName}
            </Typography>
            <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
              О фильме
            </Typography>
            <Typography>Год производства: {movie?.year}</Typography>
            <Typography>
              Страна:
              {movie?.countries?.map((country) => country.name).join(", ")}
            </Typography>
            <Typography>
              Жанр: {movie?.genres?.map((genre) => genre.name).join(", ")}
            </Typography>
            <Typography>
              Режиссер:
              {
                movie?.persons?.find(
                  (person) => person.profession === "режиссеры"
                )?.name
              }
            </Typography>
            <Typography>
              Бюджет: {movie?.budget?.currency}
              {movie?.budget?.value}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              В главных ролях
            </Typography>
            {movie?.persons
              ?.filter((person) => person.profession === "актеры")
              .map((actor, index) => (
                <Typography key={index}>{actor.name}</Typography>
              ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MoviePage;
