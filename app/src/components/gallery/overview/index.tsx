import { component$, useStyles$ } from "@builder.io/qwik";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import ArtistStyles from "~/styles/artist.css?inline";

const GalleryOverview = component$(({ gallery }: { gallery: Gallery }) => {
  useStyles$(ArtistStyles);

  return (
    <div class="artist-bio">
      <div class="artist-ava">
        <img src={gallery.avatarImg} alt="" loading="lazy" />
      </div>
      <div class="artist-details">
        <p class="artist-bio-name">{gallery.name?.toUpperCase()}</p>
        <div
          dangerouslySetInnerHTML={`${sanitizeHtml(
            marked.parse(gallery.description || "")
          )}`}
          class="artist-members"
        >
          {gallery.summary}
        </div>
        <div
          dangerouslySetInnerHTML={`${sanitizeHtml(
            marked.parse(gallery.description || "")
          )}`}
          class="artist-desc"
        ></div>
      </div>
    </div>
  );
});

export default GalleryOverview;
