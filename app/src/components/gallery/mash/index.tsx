import { component$, useResource$, useStore, $ } from "@builder.io/qwik";
import FilmCard from "./FilmCard";
import { LoadingIcon } from "../../icon";
import { getAllFilmsInOneGallery, updateFilmPoints } from "~/services/film";
import { calcEloRating, randomizeFilm } from "~/utils";
import { StyledMash } from "~/components/styled/mash.css";

interface FilmmashStore {
  indexLeft: number;
  indexRight: number;
  filmLeft: Film;
  filmRight: Film;
  galleryFilms: Films;
  isLoading: boolean;
}

const FilmMash = component$(({ gallery }: { gallery: Gallery }) => {
  const store: FilmmashStore = useStore(
    {
      indexLeft: 0,
      indexRight: 0,
      filmLeft: { points: 0, _id: "" },
      filmRight: { points: 0, _id: "" },
      galleryFilms: [],
      isLoading: true,
    },
    { deep: true }
  );

  useResource$(async () => {
    store.galleryFilms = await getAllFilmsInOneGallery(gallery._id);
    [store.indexLeft, store.indexRight] = randomizeFilm(
      store.galleryFilms.length
    );
    store.isLoading = false;
  });

  useResource$(async ({ track }) => {
    const indexLeft = track(() => store.indexLeft);
    const indexRight = track(() => store.indexRight);
    store.filmLeft = store.galleryFilms[indexLeft];
    store.filmRight = store.galleryFilms[indexRight];
  });

  const clickHandler = $(async (event: Event, winner: string) => {
    event.stopPropagation();
    const target = event.target as any;
    if (target?.localName !== "iframe") {
      store.isLoading = true;

      const [leftPoints, rightPoints] = calcEloRating(
        store.filmLeft.points || 0,
        store.filmRight.points || 0,
        winner
      );

      await updateFilmPoints(gallery._id, store.filmLeft._id, leftPoints);
      await updateFilmPoints(gallery._id, store.filmRight._id, rightPoints);

      store.galleryFilms = await getAllFilmsInOneGallery(gallery._id);
      [store.indexLeft, store.indexRight] = randomizeFilm(
        store.galleryFilms.length
      );
      store.isLoading = false;
    }
  });

  console.log(store.galleryFilms);

  return (
    <StyledMash>
      <FilmCard
        film={store.filmLeft}
        clickHandler={$((e: Event) => clickHandler(e, "left"))}
        isVisible={store.isLoading ? "hidden" : "visible"}
      />
      {store.isLoading ? <LoadingIcon /> : <div class="versus">vs.</div>}
      <FilmCard
        film={store.filmRight}
        clickHandler={$((e: Event) => clickHandler(e, "right"))}
        isVisible={store.isLoading ? "hidden" : "visible"}
      />
    </StyledMash>
  );
});

export default FilmMash;
