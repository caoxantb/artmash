import { component$ } from "@builder.io/qwik";
import HomeGallery from "./HomeGallery";

interface HomeGalleriesProps {
  galleries: Galleries;
}

const HomeGalleries = component$(({ galleries }: HomeGalleriesProps) => {
  return (
    <div className="artists-grid">
      {galleries.map((gallery) => (
        <HomeGallery gallery={gallery} />
      ))}
    </div>
  );
});

export default HomeGalleries;
