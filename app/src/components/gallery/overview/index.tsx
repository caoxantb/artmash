import { component$ } from "@builder.io/qwik";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import {
  StyledOverview,
  GalleryAvatar,
  AvatarImage,
  GalleryDescription,
  GalleryName,
  GallerySummary,
} from "~/components/styled/overview.css";

const GalleryOverview = component$(({ gallery }: { gallery: Gallery }) => {
  return (
    <StyledOverview>
      <GalleryAvatar>
        <AvatarImage src={gallery.avatarImg} alt="" loading="lazy" />
      </GalleryAvatar>
      <>
        <GalleryName>{gallery.name?.toUpperCase()}</GalleryName>
        <GallerySummary
          dangerouslySetInnerHTML={`${sanitizeHtml(
            marked.parse(gallery.summary || "")
          )}`}
        />
        <GalleryDescription
          dangerouslySetInnerHTML={`${sanitizeHtml(
            marked.parse(gallery.description || "")
          )}`}
        />
      </>
    </StyledOverview>
  );
});

export default GalleryOverview;
