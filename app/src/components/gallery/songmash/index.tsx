import {
  component$,
  useWatch$,
  useStore,
  useClientEffect$,
  $,
} from "@builder.io/qwik";
import ArtistTrackCard from "./track-card";
import trackService from "~/services/track";
import { calcEloRating } from "~/helpers/elo-agorithm";
import ArtistLoadingIcon from "../../icon/loading";
import { randomizeSongs } from "~/helpers/random-song";
import { getAllFilmsInOneGallery, updateFilmPoints } from "~/services/film";

interface FilmmashStore {
  indexLeft: number;
  indexRight: number;
  filmLeft: any;
  filmRight: any;
  galleryFilms: any;
  isLoading: boolean;
}

const FilmMash = component$(({ gallery }: { gallery: Gallery }) => {
  const store: FilmmashStore = useStore(
    {
      indexLeft: 0,
      indexRight: 0,
      filmLeft: {},
      filmRight: {},
      galleryFilms: [],
      isLoading: true,
    },
    { recursive: true }
  );

  useClientEffect$(async () => {
    store.galleryFilms = await getAllFilmsInOneGallery(gallery._id);
    [store.indexLeft, store.indexRight] = randomizeSongs(
      store.galleryFilms.length
    );
    store.isLoading = false;
  });

  useWatch$(async ({ track }) => {
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
      [store.indexLeft, store.indexRight] = randomizeSongs(
        store.galleryFilms.length
      );
      store.isLoading = false;
    }
  });

  return (
    <div className="artist-songmash">
      <div onClick$={$((e: Event) => clickHandler(e, "left"))}>
        {store.filmLeft.name}
      </div>
      {/* <ArtistTrackCard
        track={store.trackLeft}
        clickHandler={$((e: Event) => clickHandler(e, "left"))}
        isVisible={store.isLoading ? "hidden" : "visible"}
      /> */}
      {store.isLoading ? (
        <ArtistLoadingIcon />
      ) : (
        <div className="versus">vs.</div>
      )}
      <div onClick$={$((e: Event) => clickHandler(e, "right"))}>
        {store.filmRight.name}
      </div>
      {/* <ArtistTrackCard
        track={store.trackRight}
        clickHandler={$((e: Event) => clickHandler(e, "right"))}
        isVisible={store.isLoading ? "hidden" : "visible"}
      /> */}
    </div>
  );
});

export default FilmMash;
