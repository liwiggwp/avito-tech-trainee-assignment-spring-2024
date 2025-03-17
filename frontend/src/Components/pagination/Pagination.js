import React from "react";
import { Box, Pagination } from "@mui/material";

const PaginationComponent = ({ page, pages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Pagination
        count={pages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "grey",
            borderColor: "#161616",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "rgba(250, 175, 0, 0.7)",
            color: "white",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "rgba(156, 156, 156, 0.5)",
          },
        }}
      />
    </Box>
  );
};

export default PaginationComponent;
