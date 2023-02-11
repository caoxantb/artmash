import { component$, QRL} from "@builder.io/qwik";

interface ArtistTogglerProps {
  clickHandler: QRL<(e: any) => void>;
  toggle: 'biography' | 'songmash' | 'rankings'
}

const ArtistToggler = component$(({ clickHandler, toggle }: ArtistTogglerProps) => {
  return (
    <div className="artist-toggler">
      <div
        id="biography"
        className={`artist-toggle-section ${
          toggle === "biography" ? "active" : ""
        }`}
        onClick$={clickHandler}
      >
        BIOGRAPHY
      </div>
      <div
        id="songmash"
        className={`artist-toggle-section ${
          toggle === "songmash" ? "active" : ""
        }`}
        onClick$={clickHandler}
      >
        SONG • MASH
      </div>
      <div
        id="rankings"
        className={`artist-toggle-section ${
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
