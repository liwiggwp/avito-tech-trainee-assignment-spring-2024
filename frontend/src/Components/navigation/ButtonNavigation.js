import React from "react";
import { Button } from "@mui/material";

function ButtonNavigation({ onFetchFiltered, name }) {
  return (
    <Button
      variant="outlined"
      onClick={onFetchFiltered}
      sx={{
        color: "grey",
        borderColor: "#161616",
        "&:hover": {
          backgroundColor: "rgba(22, 22, 22, 0.5)",
        },
      }}
    >
      {name}
    </Button>
  );
}

export default ButtonNavigation;
