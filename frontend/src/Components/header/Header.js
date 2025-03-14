import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "../search/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#161616" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Typography variant="h5">Avito tech Movies</Typography>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  ml: 4,
                  color: "rgba(255, 255, 255, 0.5)",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Главная
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  ml: 2,
                  color: "rgba(255, 255, 255, 0.5)",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Рандомный фильм
              </Typography>
            </Box>
            <SearchBar />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              sx={{ ml: 2 }}
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
