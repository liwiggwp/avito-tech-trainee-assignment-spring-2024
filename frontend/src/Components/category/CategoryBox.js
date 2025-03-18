import React from "react";
import CategoryFilter from "./CategoryFilter";
import CustomSelect from "../common/CustomSelect";

function CategoryBox({
  genres,
  onFetchFilteredMovies,
  onHandleGenreClick,
  selectedCountry,
  onHandleCountryClick,
  countries,
}) {
  const categories = [
    {
      title: "По жанрам",
      options: genres.map((genre) => ({
        label: genre.name,
        value: genre.name,
      })),
      onOptionClick: onHandleGenreClick,
    },
    {
      title: "По году",
      options: [2020, 2021, 2022, 2023, 2024],
      onOptionClick: (year) => onFetchFilteredMovies({ year }),
    },
    {
      title: "По странам",
      options: [
        { label: "Американские", value: "США" },
        { label: "Российские", value: "Россия" },
        { label: "Немецкое", value: "Германия" },
        { label: "Турецкое", value: "Турция" },
        { label: "Советское", value: "СССР" },
      ],
      onOptionClick: (country) =>
        onFetchFilteredMovies({ "countries.name": country }),
    },
  ];

  return (
    <>
      {categories.map((category, index) => (
        <CategoryFilter
          key={index}
          title={category.title}
          options={category.options}
          onOptionClick={category.onOptionClick}
        />
      ))}
      <CustomSelect
        label="Другое"
        value={selectedCountry}
        options={countries.map((country) => ({
          label: country.name,
          value: country.name,
        }))}
        onChange={onHandleCountryClick}
      />
    </>
  );
}

export default CategoryBox;
