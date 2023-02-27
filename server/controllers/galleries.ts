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
    contentTypeFilmsId,
    environmentId,
  }: {
    spaceId: string;
    accessToken: string;
    contentTypeGalleryId: string;
    contentTypeFilmsId: string;
    environmentId: string;
  },
  userId: string
) => {
  const galleryFilms = await getEntriesIdFromContentful(
    spaceId,
    accessToken,
    contentTypeFilmsId,
    environmentId
  );

  const gallery = await Gallery.create({
    spaceId,
    accessToken,
    contentTypeGalleryId,
    contentTypeFilmsId,
    environmentId,
    user: userId,
    filmsId: galleryFilms,
    _id: `${spaceId}-${contentTypeGalleryId}`,
  });

  return gallery;
};

const getAllGalleries = async (user?: string) => {
  const galleries = await Gallery.find(user ? { user } : {});
  const galleriesData = galleries.map(async (gallery) => {
    const { spaceId, accessToken, contentTypeGalleryId, environmentId } =
      gallery;
    const galleryData = await getAllEntriesFromContentful(
      spaceId,
      accessToken,
      contentTypeGalleryId,
      environmentId
    );
    return { _id: gallery._id, user: gallery.user, ...galleryData[0] };
  });
  const resolvedGalleriesData = await Promise.all(galleriesData);

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
    filmsId: gallery.filmsId,
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
