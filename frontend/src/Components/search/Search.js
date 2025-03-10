import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.25)",
        },
        width: "100%",
        "@media (min-width:600px)": {
          marginLeft: "8px",
          width: "auto",
        },
      }}
    >
      <Box
        sx={{
          padding: "0 16px",
          height: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Поиск"
        inputProps={{ "aria-label": "search" }}
        sx={{
          color: "inherit",
          width: "100%",
          "& .MuiInputBase-input": {
            padding: "8px 8px 8px 0",
            paddingLeft: "calc(1em + 32px)",
            transition: "width 0.2s ease-in-out",
            "@media (min-width:600px)": {
              width: "12ch",
              "&:focus": {
                width: "20ch",
              },
            },
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;
