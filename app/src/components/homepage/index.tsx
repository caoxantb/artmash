import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { StyledHome } from "../styled/home.css";
import Banner from "./Banner";
import HomeGalleries from "./HomeGalleries";
import { getAllGalleries } from "~/services/gallery";

interface GalleriesGridStore {
  galleries: Galleries;
}

const Home = component$(() => {
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
    <StyledHome>
      <Banner />
      <HomeGalleries galleries={store.galleries} />
    </StyledHome>
  );
});

export default Home;
