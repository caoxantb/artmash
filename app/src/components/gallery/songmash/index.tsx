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
import ArtistLoadingIcon from '../../icon/loading'
import { randomizeSongs } from "~/helpers/random-song";
import mashService from '~/services/mash';

interface ArtistSongMashStore {
  indexLeft: number;
  indexRight: number;
  trackLeft: Track;
  trackRight: Track;
  artistAllSongs: Tracks | Track[];
  isLoading: Boolean;
}

const ArtistSongMash = component$(({ artist }: IArtist) => {
  const store: ArtistSongMashStore = useStore(
    {
      indexLeft: 0,
      indexRight: 0,
      trackLeft: { _id: "" },
      trackRight: { _id: "" },
      artistAllSongs: [],
      isLoading: true,
    },
    { recursive: true }
  );


  useClientEffect$(async () => {
    store.artistAllSongs = await trackService.getAllTracksByArtist(
      artist.nameRef
    );
    [store.indexLeft, store.indexRight] = randomizeSongs(store.artistAllSongs.length)
    store.isLoading = false
  });

  useWatch$(async ({ track }) => {
    const indexLeft = track(() => store.indexLeft);
    const indexRight = track(() => store.indexRight);
    store.trackLeft = store.artistAllSongs.find(
      (track) => track.index === indexLeft
    ) || { _id: "" };
    store.trackRight = store.artistAllSongs.find(
      (track) => track.index === indexRight
    ) || { _id: "" };
  });

  const clickHandler = $(async (event: Event, winner: string) => {
    event.stopPropagation();
    const target = event.target as any;
    if (target?.localName !== "iframe") {
      store.isLoading = true;

      const [leftPoints, rightPoints] = calcEloRating(
        store.trackLeft.points || 0,
        store.trackRight.points || 0,
        winner
      );

      console.log([leftPoints, rightPoints])

      const trackLeft: Track = {
        ...(await trackService.updateTrackPoints(
          store.trackLeft._id,
          leftPoints
        )),
        points: leftPoints,
      };
      const trackRight: Track = {
        ...(await trackService.updateTrackPoints(
          store.trackRight._id,
          rightPoints
        )),
        points: rightPoints,
      };

      store.artistAllSongs = store.artistAllSongs.map((track) =>
        track.index === store.indexLeft ? trackLeft : track
      );
      store.artistAllSongs = store.artistAllSongs.map((track) =>
        track.index === store.indexRight ? trackRight : track
      );

      await mashService.updateMash(artist.nameRef, [store.trackLeft.index || 0, store.trackRight.index || 0], winner)

      ;[store.indexLeft, store.indexRight] = randomizeSongs(store.artistAllSongs.length)
      store.isLoading = false
    }
  });

  return (
    <div className="artist-songmash">
      <ArtistTrackCard
        track={store.trackLeft}
        clickHandler={$((e: Event) => clickHandler(e, "left"))}
        isVisible={store.isLoading ? "hidden" : "visible"}
      />
      {store.isLoading ? (
        <ArtistLoadingIcon />
      ) : (
        <div className="versus">vs.</div>
      )}
      <ArtistTrackCard
        track={store.trackRight}
        clickHandler={$((e: Event) => clickHandler(e, "right"))}
        isVisible={store.isLoading ? "hidden" : "visible"}
      />
    </div>
  );
});

export default ArtistSongMash;
