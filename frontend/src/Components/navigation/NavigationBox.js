import React from "react";
import { Typography, Box } from "@mui/material";
import CustomButton from "../common/CustomButton";
import CustomSelect from "../common/CustomSelect";

function NavigationBox({ onFetchFiltered, limit, onHandleLimitChange }) {
  const navigationItems = [
    { type: "movie", name: "Фильмы" },
    { type: "tv-series", name: "Сериалы" },
    { type: "anime", name: "Аниме" },
  ];
  const options = [10, 20, 30, 50];
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
          <CustomButton
            key={item.type}
            onClick={() => onFetchFiltered({ type: item.type })}
            name={item.name}
          />
        ))}
      </Box>
      <CustomSelect
        label="Количество"
        value={limit}
        options={options}
        onChange={onHandleLimitChange}
      />
    </>
  );
}

export default NavigationBox;
