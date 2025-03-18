import React from "react";
import { Button } from "@mui/material";

function CustomButton({ onClick, name }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: "grey",
        borderColor: "#161616",
        "&:hover": {
          backgroundColor: "rgba(250, 175, 0, 0.7)",
          color: "black",
        },
      }}
    >
      {name}
    </Button>
  );
}

export default CustomButton;
