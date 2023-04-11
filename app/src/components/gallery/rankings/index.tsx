import { component$, useStore, useResource$, $ } from "@builder.io/qwik";
import { FilmRankingHeader, FilmRankingRow } from "./Row";
import { LoadingIcon } from "../../icon";
import { getAllFilmsInOneGallery } from "~/services/film";
import { filmSort } from "~/utils";

interface FilmRankingStore {
  allFilms: Films;
  sortBy: {
    column: "score" | "film" | "year" | "director" | "country";
    direction: "asc" | "desc";
  };
  isLoading: boolean;
}

const FilmRanking = component$(({ gallery }: { gallery: Gallery }) => {
  const store: FilmRankingStore = useStore(
    {
      allFilms: [],
      sortBy: {
        column: "score",
        direction: "desc",
      },
      isLoading: true,
    },
    { deep: true }
  );

  useResource$(async () => {
    store.allFilms = await getAllFilmsInOneGallery(gallery._id);
    store.allFilms = store.allFilms.sort(
      (film1, film2) => (film2.points || 0) - (film1.points || 0)
    );
    store.isLoading = false;
  });

  useResource$(({ track }) => {
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
    <div class="artist-rankings">
      {!store.isLoading ? (
        <>
          <FilmRankingHeader
            innerWidth={window.innerWidth}
            sortBy={store.sortBy}
            sortHandler={sortHandler}
          />
          {store.allFilms.map((film, index) => {
            console.log(film)
            return (
              <FilmRankingRow
                film={film}
                key={index}
                index={index}
                innerWidth={window.innerWidth}
              />
            );
          })}
        </>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
});

export default FilmRanking;
