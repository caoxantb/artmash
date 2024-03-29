const galleryAPI = "https://filmmash.vercel.app/api/galleries";

const createGallery = async (
  spaceId: string,
  accessToken: string,
  contentTypeGalleryId: string,
  contentTypeFilmsId: string,
  environmentId: string
) => {
  let token;
  const user = window.localStorage.getItem("loggedUser");
  if (user) {
    token = JSON.parse(user).token;
  }
  const res = await fetch(`${galleryAPI}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      spaceId,
      accessToken,
      contentTypeGalleryId,
      contentTypeFilmsId,
      environmentId,
    }),
    credentials: "include",
  });
  const gallery = await res.json();
  return gallery;
};

const getAllGalleries = async () => {
  const res = await fetch(`${galleryAPI}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  const galleries = await res.json();
  return galleries;
};

const getUserGallery = async (userId: string) => {
  const res = await fetch(`${galleryAPI}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
  });
  const gallery = await res.json();
  return gallery;
};

const getOneGallery = async (galleryId: string) => {
  const res = await fetch(`${galleryAPI}/${galleryId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
  });
  const gallery = await res.json();
  return gallery;
};

const deleteOneGallery = async (galleryId: string) => {
  const res = await fetch(`${galleryAPI}/${galleryId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
  });
  return await res.json();
};

export {
  createGallery,
  getAllGalleries,
  getUserGallery,
  getOneGallery,
  deleteOneGallery,
};
