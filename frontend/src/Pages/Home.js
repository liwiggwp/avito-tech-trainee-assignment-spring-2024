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
  Button,
} from "@mui/material";
import MovieCarousel from "../Components/catalog/MovieCarousel";
import Pagination from "../Components/pagination/Pagination";

export default function HOME() {
  const { getMovies, getCategories } = useApi();
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [moviesTop, setMoviesTop] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({});

  const fetchMovies = async () => {
    const movies = await getMovies({ ...filters, page, limit });
    setMovies(movies.docs);
    setPages(movies.pages);
  };

  useEffect(() => {
    fetchMovies(page);

    const fetchMoviesTop = async () => {
      const moviesTop = await getMovies({ lists: "popular-films" });
      setMoviesTop(moviesTop.docs);
    };
    getCategories("genres.name")
      .then((data) => setGenres(data))
      .catch(console.error);
    getCategories("countries.name")
      .then((data) => setCountries(data))
      .catch(console.error);

    fetchMoviesTop();
  }, [page, limit]);

  const fetchFilteredMovies = async (newFilters) => {
    setFilters(newFilters);

    const filteredMovies = await getMovies({
      ...newFilters,
      page: 1,
      limit: 10,
    });

    setMovies(filteredMovies.docs);
    setPages(filteredMovies.pages);
  };

  const handleCountryClick = async (event) => {
    setSelectedCountry(event.target.value);
    fetchFilteredMovies({ "countries.name": event.target.value });
  };

  const handleGenreClick = async (genre) => {
    fetchFilteredMovies({ "genres.name": genre });
  };

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    const filteredMovies = await getMovies({
      ...filters,
      page: newPage,
      limit,
    });

    setMovies(filteredMovies.docs);
    setPages(filteredMovies.pages);
  };

  const handleLimitChange = async (event) => {
    const newLimit = event.target.value;
    setLimit(newLimit);
    setPage(1);

    const filteredMovies = await getMovies({
      ...filters,
      page: 1,
      limit: newLimit,
    });

    setMovies(filteredMovies.docs);
    setPages(filteredMovies.pages);
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
          <MovieCarousel name={"Популярные фильмы"} movies={moviesTop} />
          <Box
            sx={{
              backgroundColor: "rgba(37, 37, 37, 0.5)",
              mt: 2,
              mb: 2,
              p: 1,
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h5" color="white">
              Навигация
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                flex: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={async () => {
                  await fetchFilteredMovies({ type: "movie" });
                }}
                sx={{
                  color: "grey",
                  borderColor: "#161616",
                  "&:hover": {
                    backgroundColor: "rgba(22, 22, 22, 0.5)",
                  },
                }}
              >
                Фильмы
              </Button>
              <Button
                variant="outlined"
                onClick={async () => {
                  fetchFilteredMovies({ type: "tv-series" });
                }}
                sx={{
                  color: "grey",
                  borderColor: "#161616",
                  "&:hover": {
                    backgroundColor: "rgba(22, 22, 22, 0.5)",
                  },
                }}
              >
                Сериалы
              </Button>
              <Button
                variant="outlined"
                onClick={async () => {
                  fetchFilteredMovies({ type: "anime" });
                }}
                sx={{
                  color: "grey",
                  borderColor: "#161616",
                  "&:hover": {
                    backgroundColor: "rgba(22, 22, 22, 0.5)",
                  },
                }}
              >
                Аниме
              </Button>
            </Box>
            <FormControl
              sx={{ minWidth: 70, ml: 2 }}
              size="small"
              variant="standard"
            >
              <InputLabel
                id="limit-select-label"
                sx={{
                  color: "grey",
                  fontSize: 15,
                  "&.Mui-focused": {
                    color: "grey",
                  },
                }}
              >
                Количество
              </InputLabel>
              <Select
                labelId="limit-select-label"
                value={limit}
                onChange={handleLimitChange}
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
                {[10, 20, 30, 50].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                    onClick={() => handleGenreClick(genre.name)}
                  >
                    {genre.name}
                  </Typography>
                ))}
                <Typography variant="h6" color="white">
                  По году
                </Typography>
                {[2020, 2021, 2022, 2023, 2024].map((year) => (
                  <Typography
                    key={year}
                    color="grey"
                    fontSize={15}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                    onClick={async () => {
                      fetchFilteredMovies({ year });
                    }}
                  >
                    {year}
                  </Typography>
                ))}
                <Typography variant="h6" color="white">
                  По странам
                </Typography>
                {[
                  { label: "Американские", value: "США" },
                  { label: "Российские", value: "Россия" },
                  { label: "Немецкое", value: "Германия" },
                  { label: "Турецкое", value: "Турция" },
                  { label: "Советское", value: "СССР" },
                ].map((country) => (
                  <Typography
                    key={country.value}
                    color="grey"
                    fontSize={15}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                    onClick={async () => {
                      fetchFilteredMovies({ "countries.name": country.value });
                    }}
                  >
                    {country.label}
                  </Typography>
                ))}

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
                    onChange={handleCountryClick}
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
          <Pagination
            page={page}
            pages={pages}
            onPageChange={handlePageChange}
          />
        </Container>
      </Box>
    </>
  );
}
