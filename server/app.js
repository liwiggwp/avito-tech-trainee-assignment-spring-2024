const express = require("express");
const {
  initialMovies,
  initialGenres,
  initialCountries,
  initialReview,
} = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Получение всех фильмов
app.get("/movie", (req, res) => {
  const {
    type,
    year,
    lists,
    "genres.name": genresName,
    "countries.name": countriesName,
    ageRating,
    page = 1,
    limit = 10,
    selectFields,
  } = req.query;

  let movies = initialMovies;

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

  // По коллекциям
  if (lists) {
    const listFilters = lists.toLowerCase().split(",");
    movies = movies.filter(
      (movie) =>
        movie.lists &&
        movie.lists.some((list) => listFilters.includes(list.toLowerCase()))
    );
  }

  // По возрастному рейтингу
  if (ageRating) {
    const ageRatingFilters = ageRating.toLowerCase().split(",");
    movies = movies.filter((movie) => {
      const movieAgeRating = String(movie.ageRating || "").toLowerCase();
      return ageRatingFilters.includes(movieAgeRating);
    });
  }

  // Пагинация
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const startIndex = (pageNumber - 1) * limitNumber;
  const paginatedMovies = movies.slice(
    startIndex,
    startIndex + limitNumber
  );

  // Выбор полей
  let selectedMovies = paginatedMovies;
  if (selectFields) {
    const fields = selectFields.split(",");
    selectedMovies = paginatedMovies.map((movie) => {
      const selectedMovie = {};
      fields.forEach((field) => {
        if (movie[field] !== undefined) {
          selectedMovie[field] = movie[field];
        }
      });
      return selectedMovie;
    });
  }

  const AllPages = Math.ceil(movies.length / limitNumber);

  res.json({
    docs: selectedMovies,
    total: movies.length,
    limit: limitNumber,
    page: pageNumber,
    pages: AllPages,
  });
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
  const movie = initialMovies.find((movie) => movie.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send({ message: "Movie not found" });
  }
});

// Получение отзывов по фильму
app.get("/review", (req, res) => {
  const movieId = parseInt(req.query.movieId, 10);
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  if (!movieId) {
    return res.status(400).send({ message: "movieId is required" });
  }

  const reviews = initialReview.docs.filter(
    (review) => review.movieId === movieId
  );

  const startIndex = (page - 1) * limit;
  const paginatedReviews = reviews.slice(startIndex, startIndex + limit);

  res.json({
    page,
    limit,
    total: reviews.length,
    reviews: paginatedReviews,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
