import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../../Services/ApiRequest";
import SearchList from "./SearchList";
import { Typography } from "@mui/material";
function SearchBar() {
  const { getSearch } = Api();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  const [searchResults, setSearchResults] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
      setNoResults(false);
      setShowResults(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!debouncedSearchQuery.trim()) return;

    const updatedHistory = [
      debouncedSearchQuery,
      ...searchHistory.filter((item) => item !== debouncedSearchQuery),
    ].slice(0, 8);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    setShowHistory(false);
    setShowResults(true);

    try {
      const results = await getSearch(debouncedSearchQuery);
      setSearchResults(results.docs);
      setNoResults(results.docs.length === 0);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setNoResults(true);
    }
  };

  const filteredSuggestions = searchHistory.filter((item) =>
    item.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setShowHistory(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 200);
  };

  return (
    <Box ref={searchRef}>
      <Box
        sx={{
          position: "relative",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          },
          width: "100%",
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
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowHistory(true);
          }}
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
              padding: "8px 100px 8px 0",
              paddingLeft: "calc(1em + 32px)",
              transition: "width 0.2s ease-in-out",
            },
          }}
        />
      </Box>
      {showHistory && filteredSuggestions.length > 0 && (
        <SearchList
          items={filteredSuggestions}
          isSuggestions={true}
          setSearchQuery={setSearchQuery}
          setShowHistory={setShowHistory}
          setDebouncedSearchQuery={setDebouncedSearchQuery}
        />
      )}
      {showResults && searchResults.length > 0 && (
        <SearchList items={searchResults} isSuggestions={false} />
      )}
      {noResults && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            width: "36ch",
            backgroundColor: "rgb(57, 57, 57 )",
            borderRadius: "4px",
            zIndex: 10,
            color: "white",
            padding: "8px 16px",
          }}
        >
          <Typography variant="body2">Ничего не найдено</Typography>
        </Box>
      )}
    </Box>
  );
}

export default SearchBar;
