import React from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import DefaultImage from "../Assets/placeholder.jpg";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";

const CardMovie = ({ movies }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {movies.map((movie) => (
        <Card
          key={movie.id}
          component={Link}
          to={`/${movie.id}`}
          sx={{ maxWidth: 200, textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            image={movie.poster?.previewUrl || DefaultImage}
            alt={movie.name || movie.alternativeName}
            height="300"
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 1,
              backgroundColor: "rgba(22,22,22,0.9)",
              color: "white",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {movie.name || movie.alternativeName}
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="center">
              <Rating value={movie.rating.imdb / 2} readOnly max={5} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "grey" }}
              >
                {movie.rating.imdb}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" gap={1}>
              <Chip
                label={movie.year}
                sx={{ fontWeight: "bold", color: "grey" }}
              />
              <Chip
                label={`${movie.movieLength} мин.`}
                sx={{ fontWeight: "bold", color: "grey" }}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CardMovie;
