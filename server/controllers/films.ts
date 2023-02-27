import { Film, Gallery } from "../models";
import { IGallery } from "../models/gallery";
import {
  getAllEntriesFromContentful,
  getEntryFromContentful,
} from "../utils/contentful";

const getAllFilmsInOneGallery = async (galleryId: string) => {
  //film like, all with metadata
  const gallery = await Gallery.findById(galleryId);
  const { spaceId, accessToken, contentTypeFilmsId, environmentId } =
    gallery;

  const rawFilms = await Film.find({});

  //TODO: include id and points to result

  const existedFilms = await getAllEntriesFromContentful(
    spaceId,
    accessToken,
    contentTypeFilmsId,
    environmentId
  );

  const allFilms = existedFilms.map((film) => {
    const matchedFilm = rawFilms.find(
      (rawFilm) => film.entryId === rawFilm._id
    );
    const points = matchedFilm?.points || 1400;
    return { ...film, points };
  });

  return allFilms;
};

const getOneFilm = async (filmId: string) => {
  const film = await Film.findById(filmId).populate<{
    gallery: IGallery;
  }>("gallery");
  const { spaceId, accessToken, environmentId } = film.gallery;

  const filmData = await getEntryFromContentful(
    spaceId,
    accessToken,
    filmId,
    environmentId
  );

  return {
    ...filmData,
    points: film.points,
    _id: filmId,
    gallery: film.gallery,
  };
};

const updateFilmPoints = async (
  filmId: string,
  galleryId: string,
  points: number
) => {
  const film = await Film.findByIdAndUpdate(
    filmId,
    { points, gallery: galleryId },
    { upsert: true }
  );
  return film;
};

const deleteAnFilm = async (filmId: string, userId: string) => {
  const film = await Film.findById(filmId).populate<{
    gallery: IGallery;
  }>("gallery");

  if (film.gallery.user.toString() !== userId) return null;

  await Film.findByIdAndDelete(filmId);
};

export {
  getAllFilmsInOneGallery,
  getOneFilm,
  updateFilmPoints,
  deleteAnFilm,
};
