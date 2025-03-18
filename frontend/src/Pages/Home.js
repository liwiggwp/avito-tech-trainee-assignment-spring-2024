import React, { useEffect, useState, useCallback } from "react";
import useApi from "../Services/ApiRequest";
import CardMovie from "../Components/CardMovie";
import Header from "../Components/header/Header";
import { Box, Typography, Grid, Container } from "@mui/material";
import MovieCarousel from "../Components/catalog/MovieCarousel";
import Pagination from "../Components/pagination/Pagination";
import NavigationBox from "../Components/navigation/NavigationBox";
import CategoryBox from "../Components/category/CategoryBox";

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

  const fetchMovies = useCallback(async () => {
    const movies = await getMovies({ ...filters, page, limit });
    setMovies(movies.docs);
    setPages(movies.pages);
  }, [filters, page, limit, getMovies]);

  const fetchMoviesTop = useCallback(async () => {
    const moviesTop = await getMovies({ lists: "popular-films" });
    setMoviesTop(moviesTop.docs);
  }, [getMovies]);

  const fetchCategories = useCallback(async () => {
    try {
      const genresData = await getCategories("genres.name");
      setGenres(genresData);

      const countriesData = await getCategories("countries.name");
      setCountries(countriesData);
    } catch (error) {
      console.error(error);
    }
  }, [getCategories]);

  useEffect(() => {
    fetchMovies();
    fetchMoviesTop();
    fetchCategories();
  }, [fetchMovies, fetchMoviesTop, fetchCategories]);

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
            <NavigationBox
              onFetchFiltered={fetchFilteredMovies}
              limit={limit}
              onHandleLimitChange={handleLimitChange}
            />
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
                <CategoryBox
                  genres={genres}
                  onFetchFilteredMovies={fetchFilteredMovies}
                  onHandleGenreClick={handleGenreClick}
                  selectedCountry={selectedCountry}
                  onHandleCountryClick={handleCountryClick}
                  countries={countries}
                />
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
