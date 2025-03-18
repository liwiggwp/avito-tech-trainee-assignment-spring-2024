import React from "react";
import { Typography, Box } from "@mui/material";
import ButtonNavigation from "./ButtonNavigation";
import NumberMovieSelect from "./NumberMovieSelect";

function NavigationBox({ onFetchFiltered, limit, onHandleLimitChange }) {
  const navigationItems = [
    { type: "movie", name: "Фильмы" },
    { type: "tv-series", name: "Сериалы" },
    { type: "anime", name: "Аниме" },
  ];

  return (
    <>
      <Typography variant="h5" color="white">
        Навигация
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          flex: 1,
        }}
      >
        {navigationItems.map((item) => (
          <ButtonNavigation
            key={item.type}
            onFetchFiltered={() => onFetchFiltered({ type: item.type })}
            name={item.name}
          />
        ))}
      </Box>
      <NumberMovieSelect limit={limit} onHandleLimitChange={onHandleLimitChange} />
    </>
  );
}

export default NavigationBox;
