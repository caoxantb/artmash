import express from "express";
import {
  deleteAnArtpiece,
  getAllArtpiecesInOneGallery,
  getOneArtpiece,
  updateArtpiecePoints,
} from "../controllers/artpieces";
import { getAuthorizedUser } from "../utils/token";

const artpiecesRouter = express.Router();

artpiecesRouter.get(
  "/:galleryId",
  async (req: express.Request, res: express.Response) => {
    const artpieces = await getAllArtpiecesInOneGallery(req.params.galleryId);
    res.json(artpieces);
  }
);

artpiecesRouter.get(
  "/:galleryId/:artpieceId",
  async (req: express.Request, res: express.Response) => {
    const artpiece = await getOneArtpiece(req.params.artpieceId);
    res.json(artpiece);
  }
);

artpiecesRouter.put(
  "/:galleryId/:artpieceId",
  async (req: express.Request, res: express.Response) => {
    const artpiece = await updateArtpiecePoints(
      req.params.artpieceId,
      req.params.galleryId,
      req.body.points
    );
    return artpiece;
  }
);

artpiecesRouter.delete(
  "/:artpieceId",
  async (req: express.Request, res: express.Response) => {
    const user = await getAuthorizedUser(req, res);

    const deleted = await deleteAnArtpiece(
      req.params.artpieceId,
      user._id.toString()
    );
    if (deleted === null) {
      return res.status(401).json({
        error: "unauthorized action",
      });
    }
    res.status(204).json();
  }
);

export default artpiecesRouter;
