import express from "express";
import { filmsController } from "../controllers";
import { getAuthorizedUser } from "../utils/token";

const filmsRouter = express.Router();
const { getAllFilmsInOneGallery, getOneFilm, updateFilmPoints, deleteAnFilm } =
  filmsController;

filmsRouter.get(
  "/:galleryId",
  async (req: express.Request, res: express.Response) => {
    const films = await getAllFilmsInOneGallery(req.params.galleryId);
    res.json(films);
  }
);

filmsRouter.get(
  "/:galleryId/:filmId",
  async (req: express.Request, res: express.Response) => {
    const film = await getOneFilm(req.params.filmId);
    res.json(film);
  }
);

filmsRouter.put(
  "/:galleryId/:filmId",
  async (req: express.Request, res: express.Response) => {
    const film = await updateFilmPoints(
      req.params.filmId,
      req.params.galleryId,
      req.body.points
    );
    res.json(film);
  }
);

filmsRouter.delete(
  "/:filmId",
  async (req: express.Request, res: express.Response) => {
    const user = await getAuthorizedUser(req, res);

    const deleted = await deleteAnFilm(req.params.filmId, user._id.toString());
    if (deleted === null) {
      return res.status(401).json({
        error: "unauthorized action",
      });
    }
    res.status(204).json();
  }
);

export default filmsRouter;
