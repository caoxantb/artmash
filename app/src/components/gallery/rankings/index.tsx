import {
  component$,
  useStore,
  useClientEffect$,
  useOnWindow,
  useWatch$,
  $,
} from "@builder.io/qwik";
import { ArtistRankingRow, ArtistRankingHead } from "./row";
import trackService from "~/services/track";
import { trackSort } from "~/helpers/track-sorting";
import ArtistLoadingIcon from '../../icon/loading'

interface ArtistRankingsStore {
  artistAllSongs: Tracks;
  sortBy: {
    column: "score" | "track" | "release" | "duration";
    direction: "asc" | "desc" | "none";
  };
  isLoading: boolean;
}

const ArtistRankings = component$(({ artist }: IArtist) => {
  const store: ArtistRankingsStore = useStore(
    {
      artistAllSongs: [],
      sortBy: {
        column: "score",
        direction: "none",
      },
      isLoading: true,
    },
    { recursive: true }
  );

  useClientEffect$(async () => {
    store.artistAllSongs = await trackService.getAllTracksByArtist(
      artist.nameRef
    );
    store.artistAllSongs = store.artistAllSongs.sort(
      (track1, track2) => (track2.points || 0) - (track1.points || 0)
    );
    store.isLoading = false;
  });

  useWatch$(({ track }) => {
    const sortMethod = track(() => store.sortBy);
    store.artistAllSongs = trackSort(
      store.artistAllSongs,
      sortMethod.column,
      sortMethod.direction
    );
  });

  const sortHandler = $((col: any) => {
    const directions: ["asc", "desc", "none"] = ["asc", "desc", "none"];
    if (col === "score" && store.sortBy.direction === "none") {
      store.sortBy = {
        column: "score",
        direction: "asc",
      };
      return;
    }
    if (col === store.sortBy.column) {
      store.sortBy = {
        column: col,
        direction:
          directions[
            directions.findIndex((dir) => dir === store.sortBy.direction) + 1
          ],
      };
      if (store.sortBy.direction === "none") {
        store.sortBy = {
          column: "score",
          direction: "none",
        };
      }
    } else {
      store.sortBy = {
        column: col,
        direction: "asc",
      };
    }
  });

  return (
    <div className="artist-rankings">
      {!store.isLoading ? (
        <>
          <ArtistRankingHead
            innerWidth={window.innerWidth}
            sortHandler={sortHandler}
            sortBy={store.sortBy}
          />
          {store.artistAllSongs.map((track, index) => {
            return (
              <ArtistRankingRow
                track={track}
                index={index}
                innerWidth={window.innerWidth}
              />
            );
          })}
        </>
      ) : (
        <ArtistLoadingIcon />
      )}
    </div>
  );
});

export default ArtistRankings;
