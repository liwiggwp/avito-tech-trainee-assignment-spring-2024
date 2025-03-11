import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Router from "./RouteNames";
import Home from "../Pages/Home";
import MoviePage from "../Pages/MoviePage";
function AppRouter() {
  return (
    <Routes>
      <Route path={Router.HOME} element={<Home />} />
      <Route path={Router.HOME + Router.ID} element={<MoviePage />} />
    </Routes>
  );
}

export default AppRouter;
