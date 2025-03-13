import React, { useState, useEffect } from "react";
import { Box, IconButton, Card, CardMedia, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const MovieCarousel = ({ movies }) => {
  const [currentMovies, setCurrentMovies] = useState(movies || []);

  useEffect(() => {
    if (movies.length > 0) {
      setCurrentMovies(movies);
    }
  }, [movies]);

  const rotateLeft = () => {
    setCurrentMovies((prevMovies) => {
      const lastMovie = prevMovies[prevMovies.length - 1];
      return [lastMovie, ...prevMovies.slice(0, -1)];
    });
  };

  const rotateRight = () => {
    setCurrentMovies((prevMovies) => {
      const [firstMovie, ...restMovies] = prevMovies;
      return [...restMovies, firstMovie];
    });
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">Фильмы</Typography>
        <Box>
          <IconButton onClick={rotateLeft}>
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={rotateRight}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          width: "100%",
          padding: 1,
        }}
      >
        {currentMovies.map((movie, index) => (
          <Card
            key={index}
            sx={{ minWidth: 150, boxShadow: 3, position: "relative" }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={movie.poster?.previewUrl}
                alt={movie.name || movie.alternativeName}
                sx={{ height: "100%", width: "100%", filter: "brightness(70%)" }}
                />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 0",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {movie.name || movie.alternativeName}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MovieCarousel;
