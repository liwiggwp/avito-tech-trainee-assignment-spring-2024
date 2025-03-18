import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function CustomSelect({ label, value, onChange, options }) {
  return (
    <FormControl sx={{ minWidth: 70 }} size="small" variant="standard">
      <InputLabel
        labelId={`${label}-select-label`}
        sx={{
          color: "grey",
          fontSize: 15,
          "&.Mui-focused": {
            color: "grey",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        value={value}
        onChange={onChange}
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
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value || option}>
            {option.label || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
