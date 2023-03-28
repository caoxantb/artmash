import { component$, useStyles$, useStore, useMount$ } from "@builder.io/qwik";
import Banner from "./Banner";
import HomeGalleries from "./HomeGalleries";
import HomeStyles from "~/styles/home.css";
import { getAllGalleries } from "~/services/gallery";

interface GalleriesGridStore {
  galleries: Galleries;
}

const Home = component$(() => {
  useStyles$(HomeStyles);

  const store: GalleriesGridStore = useStore(
    {
      galleries: [],
    },
    { recursive: true }
  );

  useMount$(async () => {
    store.galleries = await getAllGalleries();
  });

  return (
    <div className="home">
      <Banner />
      <HomeGalleries galleries={store.galleries} />
    </div>
  );
});

export default Home;
