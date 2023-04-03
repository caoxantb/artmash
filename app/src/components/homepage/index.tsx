import { component$, useStyles$, useStore, useTask$ } from "@builder.io/qwik";
import Banner from "./Banner";
import HomeGalleries from "./HomeGalleries";
import HomeStyles from "~/styles/home.css?inline";
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
    { deep: true }
  );

  useTask$(async () => {
    store.galleries = await getAllGalleries();
  });

  return (
    <div class="home">
      <Banner />
      <HomeGalleries galleries={store.galleries} />
    </div>
  );
});

export default Home;
