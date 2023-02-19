import {
  component$,
  useStyles$,
  useServerMount$,
  useStore,
  $,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import ArtistStyles from "~/styles/artist.css";
import ArtistSongMash from "./songmash";
import ArtistBio from "./overview";
import ArtistRankings from "./rankings";
import ArtistToggler from "./navigation";
import artistService from "~/services/artist";
import { getOneGallery } from "~/services/gallery";

interface GalleryPageStore {
  gallery: Gallery;
  toggle: "overview" | "songmash" | "rankings";
}

const ArtistPage = component$(() => {
  useStyles$(ArtistStyles);

  const location = useLocation();
  console.log(location);

  const store: GalleryPageStore = useStore(
    { gallery: { _id: "", user: "" }, toggle: "overview" },
    { recursive: true }
  );

  useServerMount$(async () => {
    store.gallery = await getOneGallery(location.params.gallery);
  });

  if (!store.gallery) {
    return <div>ERROR 404 - PATH NOT FOUND</div>;
  }

  const clickHandler = $((e: any) => {
    store.toggle = e.target.id;
    console.log(e.target.id);
  });

  return (
    <div className="artist-page">
      <div
        className="artist-banner"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), fixed url(${store.gallery.bannerImg}) center/cover no-repeat`,
        }}
      >
        <p className="artist-main-title">{store.gallery.name?.toUpperCase()}</p>
      </div>
      <div className="artist-main-section">
        <ArtistToggler clickHandler={clickHandler} toggle={store.toggle} />
        {store.toggle === "overview" ? (
          <ArtistBio gallery={store.gallery} />
        ) : store.toggle === "songmash" ? (
          // <ArtistSongMash artist={store.artist} />
          <></>
        ) : (
          <></>
          // <ArtistRankings artist={store.artist} />
        )}
      </div>
    </div>
  );
});

export default ArtistPage;
