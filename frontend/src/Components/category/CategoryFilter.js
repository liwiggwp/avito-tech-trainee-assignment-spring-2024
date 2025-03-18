import React from "react";
import { Typography } from "@mui/material";

function CategoryFilter({ title, options, onOptionClick }) {
  return (
    <>
      <Typography variant="h6" color="white">
        {title}
      </Typography>
      {options.map((option) => (
        <Typography
          key={option.value || option}
          color="grey"
          fontSize={15}
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "white",
            },
          }}
          onClick={() => onOptionClick(option.value || option)}
        >
          {option.label || option}
        </Typography>
      ))}
    </>
  );
}

export default CategoryFilter;
