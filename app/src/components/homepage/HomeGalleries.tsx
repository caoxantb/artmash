import { component$ } from "@builder.io/qwik";
import HomeGallery from "./HomeGallery";

interface HomeGalleriesProps {
  galleries: Galleries;
}

const HomeGalleries = component$(({ galleries }: HomeGalleriesProps) => {
  return (
    <div class="artists-grid">
      {galleries.map((gallery) => (
        <HomeGallery key={gallery._id} gallery={gallery} />
      ))}
    </div>
  );
});

export default HomeGalleries;
