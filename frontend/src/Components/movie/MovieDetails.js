import React from "react";
import { Grid, Typography } from "@mui/material";

const MovieDetails = ({ movie }) => {
  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        {movie?.name}
      </Typography>
      <Typography variant="subtitle1" color="gray">
        {movie?.alternativeName}
      </Typography>
      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
        О фильме
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Год производства:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{movie?.year}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Страна:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.countries?.map((country) => country.name).join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Жанр:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.genres?.map((genre) => genre.name).join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Режиссер:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.persons
              ?.filter((person) => person.profession === "режиссеры")
              .map((person) => person.name || person.enName)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Сценарий:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.persons
              ?.filter((person) => person.profession === "сценаристы")
              .map((person) => person.name || person.enName)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Продюсер:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.persons
              ?.filter((person) => person.profession === "продюсеры")
              .map((person) => person.name || person.enName)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Оператор:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.persons
              ?.filter((person) => person.profession === "операторы")
              .map((person) => person.name || person.enName)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Композитор:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.persons
              ?.filter((person) => person.profession === "композиторы")
              .map((person) => person.name || person.enName)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Художник:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.persons
              ?.filter((person) => person.profession === "художники")
              .map((person) => person.name || person.enName)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Монтаж:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.persons
              ?.filter((person) => person.profession === "монтажеры")
              .map((person) => person.name || person.enName)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="gray">
            Бюджет:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {movie?.budget?.currency}
            {movie?.budget?.value}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
        Описание
      </Typography>
      <Typography variant="body1">{movie?.description}</Typography>
    </>
  );
};

export default MovieDetails;
