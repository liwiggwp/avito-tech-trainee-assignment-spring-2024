import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const updatedHistory = [
      searchQuery,
      ...searchHistory.filter((item) => item !== searchQuery),
    ].slice(0, 20);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    setShowHistory(false);
  };

  const handleFocus = () => {
    setShowHistory(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowHistory(false), 200);
  };

  return (
    <Box>
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
      {showHistory && searchHistory.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: "100%",
            width: "27ch",
            backgroundColor: "rgb(57, 57, 57 )",
            borderRadius: "4px",
            zIndex: 10,
            ml: 1,
          }}
        >
          {searchHistory.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                setSearchQuery(item);
                setShowHistory(false);
                handleSearch();
              }}
            >
              {item}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default SearchBar;
