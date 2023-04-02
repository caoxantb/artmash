export const filmSort = (
  allFilms: Films,
  col: "score" | "film" | "year" | "director" | "country",
  dir: "asc" | "desc"
) => {
  switch (col) {
    case "score":
      if (dir === "asc") {
        allFilms = allFilms.sort(
          (film1, film2) => (film1.points || 0) - (film2.points || 0)
        );
      } else if (dir === "desc") {
        allFilms = allFilms.sort(
          (film1, film2) => (film2.points || 0) - (film1.points || 0)
        );
      }
      break;
    case "film":
      if (dir === "asc") {
        allFilms = allFilms.sort((film1, film2) => {
          return film1.name && film2.name
            ? film1.name.localeCompare(film2.name)
            : 0;
        });
      } else if (dir === "desc") {
        allFilms = allFilms.sort((film1, film2) => {
          return film1.name && film2.name
            ? film2.name.localeCompare(film1.name)
            : 0;
        });
      }
      break;
    case "year":
      if (dir === "asc") {
        //
        allFilms = allFilms.sort(
          (film1, film2) => (film1.year || 0) - (film2.year || 0)
        );
      } else if (dir === "desc") {
        allFilms = allFilms.sort(
          (film1, film2) => (film2.year || 0) - (film1.year || 0)
        );
      }
      break;
    case "country":
      if (dir === "asc") {
        allFilms = allFilms.sort((film1, film2) => {
          return film1.country && film2.country
            ? film1.country.localeCompare(film2.country)
            : 0;
        });
      } else if (dir === "desc") {
        allFilms = allFilms.sort((film1, film2) => {
          return film1.country && film2.country
            ? film2.country.localeCompare(film1.country)
            : 0;
        });
      }
      break;
    case "director":
      if (dir === "asc") {
        allFilms = allFilms.sort((film1, film2) => {
          return film1.director && film2.director
            ? film1.director.localeCompare(film2.director)
            : 0;
        });
      } else if (dir === "desc") {
        allFilms = allFilms.sort((film1, film2) => {
          return film1.director && film2.director
            ? film2.director.localeCompare(film1.director)
            : 0;
        });
      }
      break;
  }
  return allFilms;
};