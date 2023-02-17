const artpieceAPI = "http://localhost:8500/api/artpiece";

const getAllArtpiecesInOneGallery = async (galleryId: string) => {
  const res = await fetch(`${artpieceAPI}/${galleryId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
  });

  const artpieces = await res.json();
  return artpieces;
};

const getOneArtpiece = async (galleryId: string, artpieceId: string) => {
  const res = await fetch(`${artpieceAPI}/${galleryId}/${artpieceId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
  });

  const artpiece = await res.json();
  return artpiece;
};

const updateArtpiecePoints = async (
  galleryId: string,
  artpieceId: string,
  points: number
) => {
  const res = await fetch(`${artpieceAPI}/${galleryId}/${artpieceId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ points }),
    credentials: "include",
  });

  const artpiece = await res.json();
  return artpiece;
};

export { getAllArtpiecesInOneGallery, getOneArtpiece, updateArtpiecePoints };
