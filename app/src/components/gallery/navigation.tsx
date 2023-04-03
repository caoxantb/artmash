import { component$, type QRL} from "@builder.io/qwik";

interface ArtistTogglerProps {
  clickHandler: QRL<(e: any) => void>;
  toggle: 'overview' | 'songmash' | 'rankings'
}

const ArtistToggler = component$(({ clickHandler, toggle }: ArtistTogglerProps) => {
  return (
    <div class="artist-toggler">
      <div
        id="overview"
        class={`artist-toggle-section ${
          toggle === "overview" ? "active" : ""
        }`}
        onClick$={clickHandler}
      >
        OVERVIEW
      </div>
      <div
        id="songmash"
        class={`artist-toggle-section ${
          toggle === "songmash" ? "active" : ""
        }`}
        onClick$={clickHandler}
      >
        SONG • MASH
      </div>
      <div
        id="rankings"
        class={`artist-toggle-section ${
          toggle === "rankings" ? "active" : ""
        }`}
        onClick$={clickHandler}
      >
        RANKINGS
      </div>
    </div>
  );
});

export default ArtistToggler;
