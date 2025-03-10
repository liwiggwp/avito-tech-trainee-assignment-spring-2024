const express = require("express");
const { initialMovies } = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Получение всех фильмов
app.get("/moved", (req, res) => {
  res.json(Object.values(initialMovies));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
