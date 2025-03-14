import React, { useEffect, useState } from "react";
import useApi from "../Services/ApiRequest";
import CardMovie from "../Components/CardMovie";
import Header from "../Components/header/Header";
import {
  Box,
  Typography,
  Grid,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MovieCarousel from "../Components/catalog/MovieCarousel";
export default function HOME() {
  const { movies, getMovies, getCategories } = useApi();
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    getMovies();

    getCategories("genres.name")
      .then((data) => setGenres(data))
      .catch(console.error);
    getCategories("countries.name")
      .then((data) => setCountries(data))
      .catch(console.error);
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          background: "#161616",
          padding: "20px 0",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <MovieCarousel movies={movies} />
          <Box
            sx={{
              backgroundColor: "rgba(37, 37, 37, 0.5)",
              mt: 2,
              mb: 2,
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="h5" color="white">
              Навигация
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={3}>
              <Typography variant="h6" color="white">
                Категории
              </Typography>
              <Box
                sx={{
                  maxHeight: 800,
                  columnCount: 2,
                }}
              >
                {genres.map((genre, index) => (
                  <Typography
                    key={index}
                    value={genre.name}
                    color="grey"
                    fontSize={15}
                  >
                    {genre.name}
                  </Typography>
                ))}
                <Typography variant="h6" color="white">
                  По году
                </Typography>
                <Typography color="grey" fontSize={15}>
                  2020
                </Typography>
                <Typography color="grey" fontSize={15}>
                  2021
                </Typography>
                <Typography color="grey" fontSize={15}>
                  2022
                </Typography>
                <Typography color="grey" fontSize={15}>
                  2023
                </Typography>
                <Typography color="grey" fontSize={15}>
                  2024
                </Typography>
                <Typography variant="h6" color="white">
                  По странам
                </Typography>
                <Typography color="grey" fontSize={15}>
                  Американские
                </Typography>
                <Typography color="grey" fontSize={15}>
                  Российские
                </Typography>
                <Typography color="grey" fontSize={15}>
                  Немецкое
                </Typography>
                <Typography color="grey" fontSize={15}>
                  Турецкое
                </Typography>
                <Typography color="grey" fontSize={15}>
                  Советское
                </Typography>

                <FormControl
                  sx={{ minWidth: 120, mt: -2 }}
                  size="small"
                  variant="standard"
                >
                  <InputLabel
                    id="country-select-label"
                    sx={{
                      color: "grey",
                      fontSize: 15,
                      "&.Mui-focused": {
                        color: "grey",
                      },
                    }}
                    shrink={false}
                  >
                    Другое
                  </InputLabel>
                  <Select
                    labelId="country-select-label"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    disableUnderline
                    sx={{
                      color: "grey",
                      fontSize: 15,
                      "&:focus": {
                        backgroundColor: "transparent",
                        outline: "none",
                      },
                    }}
                  >
                    {countries.map((country, index) => (
                      <MenuItem key={index} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={9}>
              <CardMovie movies={movies} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
