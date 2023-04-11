import { component$ } from "@builder.io/qwik";
import { StyledGalleryCard, CardLink, CardImage, CardName } from "../styled/home.css";

const HomeGallery = component$(({ gallery }: { gallery: Gallery }) => {
  return (
    <StyledGalleryCard>
      <CardLink href={`/${gallery._id}`}>
        <CardImage src={gallery.avatarImg} alt="" />
        <CardName>{gallery.name?.toUpperCase()}</CardName>
      </CardLink>
    </StyledGalleryCard>
  );
});

export default HomeGallery;
