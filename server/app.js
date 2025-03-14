const express = require("express");
const { initialMovies, initialGenres, initialCountries } = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Получение всех фильмов
app.get("/movie", (req, res) => {
  const { type, year, "genres.name": genresName, "countries.name": countriesName } = req.query;
  let movies = initialMovies.docs;

  // По типу
  if (type) {
    movies = movies.filter((movie) => movie.type === type);
  }

  // По году
  if (year) {
    const specificYear = parseInt(year, 10);
    movies = movies.filter(
      (movie) => parseInt(movie.year, 10) === specificYear
    );
  }

  // По жанру
  if (genresName) {
    const genreFilters = genresName.toLowerCase().split(",");
    movies = movies.filter((movie) =>
      movie.genres.some((genre) =>
        genreFilters.includes(genre.name.toLowerCase())
      )
    );
  }

  // По стране
  if (countriesName) {
    const countryFilters = countriesName.toLowerCase().split(",");
    movies = movies.filter((movie) =>
      movie.countries.some((country) =>
        countryFilters.includes(country.name.toLowerCase())
      )
    );
  }

  res.json(movies);
});

// Получение списка стран, жанров
app.get("/movie/possible-values-by-field", (req, res) => {
  const field = req.query.field;

  if (field === "countries.name") {
    res.json(initialCountries);
  } else if (field === "genres.name") {
    res.json(initialGenres);
  } else {
    res.status(400).send({ message: "Invalid field parameter" });
  }
});

// Получение фильма по id
app.get("/movie/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movie = initialMovies.docs.find((movie) => movie.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send({ message: "Movie not found" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
