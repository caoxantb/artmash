const filmAPI = "http://localhost:8500/api/films";

const getAllFilmsInOneGallery = async (galleryId: string) => {
  const res = await fetch(`${filmAPI}/${galleryId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  const films = await res.json();
  return films;
};

const getOneFilm = async (galleryId: string, filmId: string) => {
  const res = await fetch(`${filmAPI}/${galleryId}/${filmId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
  });

  const film = await res.json();
  return film;
};

const updateFilmPoints = async (
  galleryId: string,
  filmId: string,
  points: number
) => {
  const res = await fetch(`${filmAPI}/${galleryId}/${filmId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ points }),
  });

  const film = await res.json();
  return film;
};

export { getAllFilmsInOneGallery, getOneFilm, updateFilmPoints };
