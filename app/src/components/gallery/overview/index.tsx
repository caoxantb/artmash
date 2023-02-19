import { component$, useStyles$ } from "@builder.io/qwik";
import ArtistStyles from "~/styles/artist.css";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const ArtistBio = component$(({ gallery }: { gallery: Gallery }) => {
  useStyles$(ArtistStyles);

  return (
    <div className="artist-bio">
      <div className="artist-ava">
        <img src={gallery.avatarImg} alt="" loading="lazy" />
      </div>
      <div className="artist-details">
        <p className="artist-bio-name">{gallery.name?.toUpperCase()}</p>
        {/* <p className="artist-bio-active-years">{artist.activeYears}</p> */}
        <div
          dangerouslySetInnerHTML={`${sanitizeHtml(
            marked.parse(gallery.description || "")
          )}`}
          className="artist-members"
        >
          {gallery.summary}
        </div>
        <div
          dangerouslySetInnerHTML={`${sanitizeHtml(
            marked.parse(gallery.description || "")
          )}`}
          className="artist-desc"
        ></div>
      </div>
    </div>
  );
});

export default ArtistBio;
