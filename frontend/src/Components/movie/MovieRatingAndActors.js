import React, { useState } from "react";
import { Typography } from "@mui/material";

const MovieRatingAndActors = ({ movie }) => {
  const [showAllActors, setShowAllActors] = useState(false);
  const [showAllActorsVoice, setShowAllActorsVoice] = useState(false);

  const handleShowAllActors = () => {
    setShowAllActors(!showAllActors);
  };

  const handleShowAllActorsVoice = () => {
    setShowAllActorsVoice(!showAllActorsVoice);
  };

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {movie?.rating?.kp.toFixed(1)}
      </Typography>
      <Typography variant="subtitle1">
        {movie?.votes?.kp.toLocaleString("ru-RU")} оценок
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
        В главных ролях
      </Typography>
      {movie?.persons
        ?.filter((person) => person.profession === "актеры")
        .slice(0, showAllActors ? undefined : 10)
        .map((actor, index) => (
          <Typography key={index} variant="body2">
            {actor.name}
          </Typography>
        ))}
      {movie?.persons?.filter((person) => person.profession === "актеры")
        .length > 10 && (
        <Typography
          onClick={handleShowAllActors}
          variant="subtitle2"
          color="grey"
          sx={{ cursor: "pointer", textTransform: "none" }}
        >
          {showAllActors ? "Скрыть" : "Еще"}
        </Typography>
      )}
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
        Актеры дубляжа
      </Typography>
      {movie?.persons
        ?.filter((person) => person.profession === "актеры дубляжа")
        .slice(0, showAllActorsVoice ? undefined : 10)
        .map((actor, index) => (
          <Typography key={index} variant="body2">
            {actor.name}
          </Typography>
        ))}
      {movie?.persons?.filter((person) => person.profession === "актеры дубляжа")
        .length > 10 && (
        <Typography
          onClick={handleShowAllActorsVoice}
          variant="subtitle2"
          color="grey"
          sx={{ cursor: "pointer", textTransform: "none" }}
        >
          {showAllActorsVoice ? "Скрыть" : "Еще"}
        </Typography>
      )}
    </>
  );
};

export default MovieRatingAndActors;