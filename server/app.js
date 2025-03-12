const express = require("express");
const { initialMovies, initialGenres, initialCountries } = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Получение всех фильмов
app.get("/movie", (req, res) => {
  res.json(Object.values(initialMovies));
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
