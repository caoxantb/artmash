const trackAPI = `${import.meta.env.VITE_SERVER_URL}/api/tracks`;

const getAllTracksByArtist = async (artistRef: string) => {
  const res = await fetch(`${trackAPI}/${artistRef}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
  });

  const data = await res.json()
  return data;
};

const getTrackById = async (id: string) => {
  const res = await fetch(`${trackAPI}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
  });

  const data = await res.json()
  return data;
};

const updateTrackPoints = async (id: string, newPoint: number) => {
  const res = await fetch(`${trackAPI}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      points: newPoint
    })
  });

  const data = await res.json()
  return data;
};


export default { getAllTracksByArtist, getTrackById, updateTrackPoints };
