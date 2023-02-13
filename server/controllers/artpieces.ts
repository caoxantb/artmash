import { Artpiece, Gallery } from "../models";
import { IGallery } from "../models/gallery";
import {
  getAllEntriesFromContentful,
  getEntryFromContentful,
} from "../utils/contentful";

const getAllArtpiecesInOneGallery = async (galleryId: string) => {
  //artpiece like, all with metadata
  const gallery = await Gallery.findById(galleryId);
  const { spaceId, accessToken, contentTypeArtpiecesId, environmentId } = gallery;

  console.log(gallery)

  //TODO: include id and points to result

  const artpieces = await getAllEntriesFromContentful(
    spaceId,
    accessToken,
    contentTypeArtpiecesId,
    environmentId
  );

  return artpieces;
};

const getOneArtpiece = async (artpieceId: string) => {
  const artpiece = await Artpiece.findById(artpieceId).populate<{
    gallery: IGallery;
  }>("gallery");
  const { spaceId, accessToken, environmentId } = artpiece.gallery;

  const artpieceData = await getEntryFromContentful(
    spaceId,
    accessToken,
    artpieceId,
    environmentId
  );

  return {
    ...artpieceData,
    points: artpiece.points,
    _id: artpieceId,
    gallery: artpiece.gallery,
  };
};

const updateArtpiecePoints = async (artpieceId: string, galleryId: string, points: number) => {
  const artpiece = await Artpiece.findByIdAndUpdate(
    artpieceId,
    { points, gallery: galleryId },
    { upsert: true }
  );
  return artpiece;
};

const deleteAnArtpiece = async (artpieceId: string, userId: string) => {
  const artpiece = await Artpiece.findById(artpieceId).populate<{
    gallery: IGallery;
  }>("gallery");

  if (artpiece.gallery.user.toString() !== userId) return null;

  await Artpiece.findByIdAndDelete(artpieceId);
};

export {
  getAllArtpiecesInOneGallery,
  getOneArtpiece,
  updateArtpiecePoints,
  deleteAnArtpiece,
};
