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
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: "rgba(37, 37, 37, 0.5)",
          mt: 2,
          mb: 2,
          p: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" color="white">
          Популярные фильмы
        </Typography>
        <Box>
          <IconButton
            onClick={rotateLeft}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              border: "1px solid grey",
              backgroundColor: "transparent",
              color: "grey",
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={rotateRight}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              border: "1px solid grey",
              backgroundColor: "transparent",
              color: "grey",
            }}
          >
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
                sx={{
                  height: "100%",
                  width: "100%",
                  filter: "brightness(70%)",
                }}
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
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {movie.name || movie.alternativeName}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MovieCarousel;
