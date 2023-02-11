import axios from "axios";

const artistAPI = `${import.meta.env.VITE_SERVER_URL}/api/artists`;

// const getAllArtists = async (): Promise<[Artist]> => {
//   console.log("hehe");
//   const res = await axios.get(artistAPI);
//   return res.data;
// };

const getAllArtists = async (): Promise<[Artist]> => {
  const res = await fetch(artistAPI, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await res.json()
  return data;
};

const getArtistByNameRef = async (nameRef: string) => {
  const res = await fetch(`${artistAPI}/${nameRef}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
  });

  const data = await res.json()
  return data;
};

export default { getAllArtists, getArtistByNameRef };
