import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import playButton from "../../Assets/play.png";

const MovieTrailer = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);

  const handleMouseEnter = () => {
    setShowTrailer(true);
  };

  const handleMouseLeave = () => {
    setShowTrailer(false);
  };

  const handlePlayTrailer = () => {
    setPlayTrailer(true);
  };

  return (
    <>
      {movie?.videos?.trailers?.[0]?.url && !playTrailer && (
        <>
          <Typography sx={{ fontWeight: "bold", mt: 2, p: 1 }}>
            Трейлер
          </Typography>
          <Box
            sx={{
              position: "relative",
              backgroundImage: `url(${movie?.backdrop?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showTrailer && (
              <Box
                component="img"
                src={playButton}
                alt="Play"
                sx={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                }}
                onClick={handlePlayTrailer}
              />
            )}
          </Box>
        </>
      )}
      {playTrailer && movie?.videos?.trailers?.[0]?.url && (
        <Box>
          <iframe
            src={movie.videos.trailers[0].url}
            title={movie.videos.trailers[0].name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </Box>
      )}
    </>
  );
};

export default MovieTrailer;