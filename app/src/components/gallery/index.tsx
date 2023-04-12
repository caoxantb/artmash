import {
  component$,
  useStyles$,
  useTask$,
  useStore,
  $,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Navigator from "./Navigator";
import GalleryOverview from "./overview";
import FilmMash from "./mash";
import FilmRanking from "./rankings";
import ArtistStyles from "~/styles/artist.css?inline";
import { getOneGallery } from "~/services/gallery";
import {
  GalleryBanner,
  GallerySection,
  GalleryTitle,
} from "../styled/gallery.css";

interface GalleryPageStore {
  gallery: Gallery;
  toggle: "overview" | "mash" | "rankings";
}

const GalleryPage = component$(() => {
  useStyles$(ArtistStyles);

  const location = useLocation();

  const store: GalleryPageStore = useStore(
    { gallery: { _id: "", user: "" }, toggle: "overview" },
    { deep: true }
  );

  useTask$(async () => {
    store.gallery = await getOneGallery(location.params.gallery);
  });

  if (!store.gallery) {
    return <div>ERROR 404 - PATH NOT FOUND</div>;
  }

  const clickHandler = $((e: any) => {
    store.toggle = e.target.id;
    console.log(store.toggle);
  });

  return (
    <>
      <GalleryBanner
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), fixed url(${store.gallery.bannerImg}) center/cover no-repeat`,
        }}
      >
        <GalleryTitle>{store.gallery.name?.toUpperCase()}</GalleryTitle>
      </GalleryBanner>
      <GallerySection>
        <Navigator clickHandler={clickHandler} toggle={store.toggle} />
        {store.toggle === "overview" ? (
          <GalleryOverview gallery={store.gallery} />
        ) : store.toggle === "mash" ? (
          <FilmMash gallery={store.gallery} />
        ) : (
          <FilmRanking gallery={store.gallery} />
        )}
      </GallerySection>
    </>
  );
});

export default GalleryPage;
