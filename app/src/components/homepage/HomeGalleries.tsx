import { component$ } from "@builder.io/qwik";
import { StyledGalleries } from "../styled/home.css";
import HomeGallery from "./HomeGallery";

interface HomeGalleriesProps {
  galleries: Galleries;
}

const HomeGalleries = component$(({ galleries }: HomeGalleriesProps) => {
  return (
    <StyledGalleries>
      {galleries.map((gallery) => (
        <HomeGallery key={gallery._id} gallery={gallery} />
      ))}
    </StyledGalleries>
  );
});

export default HomeGalleries;
