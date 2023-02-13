import express from "express";
import {
  createGallery,
  deleteOneGallery,
  getAllGalleries,
  getOneGallery,
} from "../controllers/galleries";
import { getAuthorizedUser } from "../utils/token";

const galleriesRouter = express.Router();

galleriesRouter.post(
  "/",
  async (req: express.Request, res: express.Response) => {
    const user = await getAuthorizedUser(req, res);

    const {
      spaceId,
      accessToken,
      contentTypeGalleryId,
      contentTypeArtpiecesId,
      environmentId,
    } = req.body;

    const gallery = await createGallery(
      {
        spaceId,
        accessToken,
        contentTypeGalleryId,
        contentTypeArtpiecesId,
        environmentId,
      },
      user._id.toString()
    );
    res.status(201).json(gallery);
  }
);

galleriesRouter.get(
  "/",
  async (req: express.Request, res: express.Response) => {
    const galleries = await getAllGalleries();
    res.json(galleries);
  }
);

galleriesRouter.get(
  "/user/:userId",
  async (req: express.Request, res: express.Response) => {
    const galleries = await getAllGalleries(req.params.userId);
    res.json(galleries);
  }
);

galleriesRouter.get(
  "/:galleryId",
  async (req: express.Request, res: express.Response) => {
    const gallery = await getOneGallery(req.params.galleryId);
    res.json(gallery);
  }
);

galleriesRouter.delete(
  ":/galleryId",
  async (req: express.Request, res: express.Response) => {
    const user = await getAuthorizedUser(req, res);

    const deleted = await deleteOneGallery(
      req.params.galleryId,
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

export default galleriesRouter;
