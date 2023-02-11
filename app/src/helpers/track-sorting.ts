export const trackSort = (
  allSongs: Tracks,
  col: "score" | "track" | "release" | "duration",
  dir: "asc" | "desc" | "none"
) => {
  if (dir === "none") {
    col = "score";
    allSongs = allSongs.sort(
      (track1, track2) =>
        (track2.points || 0) - (track1.points || 0) ||
        (track1.index || 0) - (track2.index || 0)
    );
  }
  switch (col) {
    case "score":
      if (dir === "asc") {
        allSongs = allSongs.sort(
          (track1, track2) =>
            (track1.points || 0) - (track2.points || 0) ||
            (track1.index || 0) - (track2.index || 0)
        );
      } else if (dir === "desc") {
        allSongs = allSongs.sort(
          (track1, track2) =>
            (track1.points || 0) - (track2.points || 0) ||
            (track1.index || 0) - (track2.index || 0)
        );
      }
      break;
    case "track":
      if (dir === "asc") {
        allSongs = allSongs.sort((track1, track2) => {
          return track1.title && track2.title
            ? track1.title.localeCompare(track2.title)
            : 0;
        });
      } else if (dir === "desc") {
        allSongs = allSongs.sort((track1, track2) => {
          return track1.title && track2.title
            ? track2.title.localeCompare(track1.title)
            : 0;
        });
      }
      break;
    case "release":
      if (dir === "asc") {
        //
        allSongs = allSongs.sort(
          (track1, track2) => (track1.index || 0) - (track2.index || 0)
        );
      } else if (dir === "desc") {
        allSongs = allSongs.sort(
          (track1, track2) => (track2.index || 0) - (track1.index || 0)
        );
      }
      break;
    case "duration":
      if (dir === "asc") {
        allSongs = allSongs.sort(
          (track1, track2) =>
            parseFloat(track1.duration?.replace(":", ".") || "0") -
            parseFloat(track2.duration?.replace(":", ".") || "0")
        );
      } else if (dir === "desc") {
        allSongs = allSongs.sort(
          (track1, track2) =>
            parseFloat(track2.duration?.replace(":", ".") || "0") -
            parseFloat(track1.duration?.replace(":", ".") || "0")
        );
      }
      break;
  }
  return allSongs;
};
