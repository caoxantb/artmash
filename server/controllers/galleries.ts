import { Gallery } from "../models";
import {
  getAllEntriesFromContentful,
  getEntriesIdFromContentful,
} from "../utils/contentful";

const createGallery = async (
  {
    spaceId,
    accessToken,
    contentTypeGalleryId,
    contentTypeArtpiecesId,
    environmentId,
  }: {
    spaceId: string;
    accessToken: string;
    contentTypeGalleryId: string;
    contentTypeArtpiecesId: string;
    environmentId: string;
  },
  userId: string
) => {
  const galleryArtpieces = await getEntriesIdFromContentful(
    spaceId,
    accessToken,
    contentTypeArtpiecesId,
    environmentId
  );

  const gallery = await Gallery.create({
    spaceId,
    accessToken,
    galleryArtpieces,
    contentTypeArtpiecesId,
    environmentId,
    user: userId,
    artpiecesId: galleryArtpieces,
    _id: `${spaceId}-${contentTypeGalleryId}`,
  });

  return gallery;
};

const getAllGalleries = async (user?: string) => {
  const galleries = await Gallery.find(user ? { user } : {});
  const galleriesData = galleries.map((gallery) => {
    const { spaceId, accessToken, contentTypeGalleryId, environmentId } =
      gallery;
    const galleryData = getAllEntriesFromContentful(
      spaceId,
      accessToken,
      contentTypeGalleryId,
      environmentId
    );
    return { _id: gallery._id, user: gallery.user, ...galleryData };
  });
  const resolvedGalleriesData = Promise.all(galleriesData);

  return resolvedGalleriesData;
};

const getOneGallery = async (id: string) => {
  const gallery = await Gallery.findById(id);
  const { spaceId, accessToken, contentTypeGalleryId, environmentId } = gallery;
  const galleryContentfulData = await getAllEntriesFromContentful(
    spaceId,
    accessToken,
    contentTypeGalleryId,
    environmentId
  );
  const galleryData = {
    _id: gallery._id,
    user: gallery.user,
    artpiecesId: gallery.artpiecesId,
    ...galleryContentfulData[0],
  };

  return galleryData;
};

const deleteOneGallery = async (id: string, userId: string) => {
  const gallery = await Gallery.findById(id);

  if (gallery.user.toString() !== userId) return null;

  await Gallery.findByIdAndDelete(id);

  return true;
};

export { createGallery, getAllGalleries, getOneGallery, deleteOneGallery };
