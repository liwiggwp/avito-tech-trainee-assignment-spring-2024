import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function NumberMovieSelect({ limit, onHandleLimitChange }) {
  return (
    <FormControl sx={{ minWidth: 70, ml: 2 }} size="small" variant="standard">
      <InputLabel
        id="limit-select-label"
        sx={{
          color: "grey",
          fontSize: 15,
          "&.Mui-focused": {
            color: "grey",
          },
        }}
      >
        Количество
      </InputLabel>
      <Select
        labelId="limit-select-label"
        value={limit}
        onChange={onHandleLimitChange}
        disableUnderline
        sx={{
          color: "grey",
          fontSize: 15,
          textAlign: "center",
          "&:focus": {
            backgroundColor: "transparent",
            outline: "none",
          },
          "& .MuiSelect-icon": {
            color: "rgba(250, 175, 0, 0.7)",
          },
        }}
      >
        {[10, 20, 30, 50].map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default NumberMovieSelect;
