import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Button, Card, Box } from "@mui/material";
import Api from "../Services/ApiRequest";
import Header from "../Components/header/Header";
import playButton from "../Assets/play.png";
import MovieCarousel from "../Components/catalog/MovieCarousel";
import Review from "../Components/review/Review";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, getMovieById, getReviews } = Api();
  const [showTrailer, setShowTrailer] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [showAllActors, setShowAllActors] = useState(false);
  const [showAllActorsVoice, setShowAllActorsVoice] = useState(false);
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    getMovieById(id);

    const fetchReviews = async () => {
      const response = await getReviews(id, 1, 10); 
      if (response) {
        setReviews(response.reviews); 
      }
    };
    fetchReviews();
  }, [id]);


  const handleMouseEnter = () => {
    setShowTrailer(true);
  };

  const handleMouseLeave = () => {
    setShowTrailer(false);
  };

  const handlePlayTrailer = () => {
    setPlayTrailer(true);
  };

  const handleShowAllActors = () => {
    setShowAllActors(!showAllActors);
  };

  const handleShowAllActorsVoice = () => {
    setShowAllActorsVoice(!showAllActorsVoice);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          position: "relative",
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${movie?.backdrop?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mt: 10,
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))`,
            minHeight: "100vh",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                sx={{ width: "100%" }}
                src={movie?.poster?.url}
                alt={movie?.poster?.url}
              />

              {movie?.videos?.trailers?.[0]?.url && !playTrailer && (
                <>
                  <Typography sx={{ fontWeight: "bold", mt: 2, p: 1 }}>
                    Трейлер
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      backgroundImage: `url(${movie?.backdrop?.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {showTrailer && (
                      <Box
                        component="img"
                        src={playButton}
                        alt="Play"
                        sx={{
                          width: "50px",
                          height: "50px",
                          cursor: "pointer",
                        }}
                        onClick={handlePlayTrailer}
                      />
                    )}
                  </Box>
                </>
              )}

              {playTrailer && movie?.videos?.trailers?.[0]?.url && (
                <>
                  <Typography sx={{ fontWeight: "bold", mt: 2, p: 1 }}>
                    Трейлер
                  </Typography>
                  <Box>
                    <iframe
                      src={movie.videos.trailers[0].url}
                      title={movie.videos.trailers[0].name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: "100%", height: "100%" }}
                    ></iframe>
                  </Box>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold">
                {movie?.name}
              </Typography>
              <Typography variant="subtitle1" color="gray">
                {movie?.alternativeName}
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                О фильме
              </Typography>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Год производства:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">{movie?.year}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Страна:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.countries
                      ?.map((country) => country.name)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Жанр:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.genres?.map((genre) => genre.name).join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Режиссер:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.persons
                      ?.filter((person) => person.profession === "режиссеры")
                      .map((person) => person.name || person.enName)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Сценарий:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.persons
                      ?.filter((person) => person.profession === "сценаристы")
                      .map((person) => person.name || person.enName)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Продюсер:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.persons
                      ?.filter((person) => person.profession === "продюсеры")
                      .map((person) => person.name || person.enName)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Оператор:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.persons
                      ?.filter((person) => person.profession === "операторы")
                      .map((person) => person.name || person.enName)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Композитор:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.persons
                      ?.filter((person) => person.profession === "композиторы")
                      .map((person) => person.name || person.enName)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Художник:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.persons
                      ?.filter((person) => person.profession === "художники")
                      .map((person) => person.name || person.enName)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Монтаж:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.persons
                      ?.filter((person) => person.profession === "монтажеры")
                      .map((person) => person.name || person.enName)
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="gray">
                    Бюджет:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {movie?.budget?.currency}
                    {movie?.budget?.value}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                Описание
              </Typography>
              <Typography variant="body1">{movie?.description}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {movie?.rating?.kp.toFixed(1)}
              </Typography>
              <Typography variant="subtitle1">
                {movie?.votes?.kp.toLocaleString("ru-RU")} оценок
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                В главных ролях
              </Typography>
              {movie?.persons
                ?.filter((person) => person.profession === "актеры")
                .slice(0, showAllActors ? undefined : 10)
                .map((actor, index) => (
                  <Typography key={index} variant="body2">
                    {actor.name}
                  </Typography>
                ))}
              {movie?.persons?.filter(
                (person) => person.profession === "актеры"
              ).length > 10 && (
                <Typography
                  onClick={handleShowAllActors}
                  variant="subtitle2"
                  color="grey"
                  sx={{ cursor: "pointer", textTransform: "none" }}
                >
                  {showAllActors ? "Скрыть" : "Еще"}
                </Typography>
              )}
              {movie?.persons?.filter(
                (person) => person.profession === "актеры дубляжа"
              ).length > 0 && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                    Роли дублирования
                  </Typography>
                  {movie?.persons
                    ?.filter((person) => person.profession === "актеры дубляжа")
                    .slice(0, showAllActorsVoice ? undefined : 10)
                    .map((actor, index) => (
                      <Typography key={index} variant="body2">
                        {actor.name}
                      </Typography>
                    ))}
                  {movie?.persons?.filter(
                    (person) => person.profession === "актеры дубляжа"
                  ).length > 10 && (
                    <Typography
                      onClick={handleShowAllActorsVoice}
                      variant="subtitle2"
                      color="grey"
                      sx={{ cursor: "pointer", textTransform: "none" }}
                    >
                      {showAllActorsVoice ? "Скрыть" : "Еще"}
                    </Typography>
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              {movie?.sequelsAndPrequels?.length > 0 && (
                <MovieCarousel
                  name={"Сиквелы, приквелы и ремейки"}
                  movies={movie.sequelsAndPrequels}
                />
              )}
            </Grid>
          </Grid>
          <Review reviews={reviews}/>
        </Container>
      </Box>
    </>
  );
};

export default MoviePage;
