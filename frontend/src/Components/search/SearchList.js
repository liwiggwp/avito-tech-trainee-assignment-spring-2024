import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function SearchList({
  items,
  isSuggestions,
  setSearchQuery,
  setShowHistory,
  setDebouncedSearchQuery,
}) {
  return (
    <Box>
      <List
        sx={{
          position: "absolute",
          top: "100%",
          width: "40ch",
          backgroundColor: "rgb(57, 57, 57 )",
          borderRadius: "4px",
          zIndex: 10,
          color: "white",
        }}
      >
        {items.map((item, index) => (
          <ListItem
            key={index}
            button={isSuggestions}
            onClick={
              isSuggestions
                ? () => {
                    setSearchQuery(item.name || item);
                    setShowHistory(false);
                    setDebouncedSearchQuery(item.name || item);
                  }
                : undefined
            }
            sx={{
              color: "white",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
              },
            }}
          >
            {isSuggestions ? (
              <Typography variant="body2">{item}</Typography>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    src={item?.poster?.url}
                    alt={item.name || item.alternativeName}
                    style={{
                      width: "40px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography variant="body2">
                    {item.name || item.alternativeName}
                  </Typography>
                </Box>
                <Link to={`/${item.id}`} style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      padding: "4px 8px",
                      backgroundColor: "rgba(250, 175, 0, 0.7)",
                      borderRadius: "4px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "rgba(250, 175, 0, 0.4)",
                      },
                    }}
                  >
                    Открыть
                  </Box>
                </Link>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SearchList;
