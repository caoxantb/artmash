import {
  component$,
  useStore,
  useClientEffect$,
  useWatch$,
  $,
} from "@builder.io/qwik";
import { FilmRankingHeader, FilmRankingRow } from "./Row";
import { filmSort } from "~/utils/sort-film";
import ArtistLoadingIcon from "../../icon/Loading";
import { getAllFilmsInOneGallery } from "~/services/film";

interface FilmRankingStore {
  allFilms: Films;
  sortBy: {
    column: "score" | "film" | "year" | "director" | "country";
    direction: "asc" | "desc";
  };
  isLoading: boolean;
}

const ArtistRankings = component$(({ gallery }: { gallery: Gallery }) => {
  const store: FilmRankingStore = useStore(
    {
      allFilms: [],
      sortBy: {
        column: "score",
        direction: "desc",
      },
      isLoading: true,
    },
    { recursive: true }
  );

  useClientEffect$(async () => {
    store.allFilms = await getAllFilmsInOneGallery(gallery._id);
    store.allFilms = store.allFilms.sort(
      (film1, film2) => (film2.points || 0) - (film1.points || 0)
    );
    store.isLoading = false;
  });

  useWatch$(({ track }) => {
    const sortMethod = track(() => store.sortBy);
    store.allFilms = filmSort(
      store.allFilms,
      sortMethod.column,
      sortMethod.direction
    );
  });

  const sortHandler = $((col: any) => {
    if (col === store.sortBy.column) {
      store.sortBy = {
        column: col,
        direction: store.sortBy.direction === "asc" ? "desc" : "asc",
      };
    } else {
      store.sortBy = {
        column: col,
        direction: "desc",
      };
    }
  });

  return (
    <div className="artist-rankings">
      {!store.isLoading ? (
        <>
          <FilmRankingHeader
            innerWidth={window.innerWidth}
            sortBy={store.sortBy}
            sortHandler={sortHandler}
          />
          {store.allFilms.map((film, index) => {
            return (
              <FilmRankingRow
                film={film}
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
