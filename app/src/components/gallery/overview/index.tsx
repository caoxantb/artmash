import { component$, useStyles$ } from "@builder.io/qwik";
import ArtistStyles from "~/styles/artist.css?inline";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const ArtistBio = component$(({ gallery }: { gallery: Gallery }) => {
  useStyles$(ArtistStyles);

  return (
    <div class="artist-bio">
      <div class="artist-ava">
        <img src={gallery.avatarImg} alt="" loading="lazy" />
      </div>
      <div class="artist-details">
        <p class="artist-bio-name">{gallery.name?.toUpperCase()}</p>
        {/* <p class="artist-bio-active-years">{artist.activeYears}</p> */}
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

export default ArtistBio;
