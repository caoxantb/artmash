import { component$, useStyles$ } from "@builder.io/qwik";
import ArtistStyles from "~/styles/artist.css";

const ArtistBio = component$(({artist}: IArtist ) => {
  useStyles$(ArtistStyles);

  return (
    <div className="artist-bio">
      <div className="artist-ava">
        <img src={artist.avatarImg} alt="" loading="lazy"/>
      </div>
      <div className="artist-details">
        <p className="artist-bio-name">{artist.name?.toUpperCase()}</p>
        <p className="artist-bio-active-years">{artist.activeYears}</p>
        <p className="artist-members">
          {artist.members?.map(member => <span>{member} • </span>)}
        </p>
        <div className="artist-desc">
          {artist.description?.includes("[break]")
            ? artist.description?.split("[break]").map((desc) => <div className="artist-subdesc">{desc}</div>)
            : artist.description}
        </div>
      </div>
    </div>
  );
});

export default ArtistBio;
