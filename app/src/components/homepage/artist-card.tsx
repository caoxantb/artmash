import { component$ } from "@builder.io/qwik";

const ArtistCard = component$(({ artist }: IArtist) => {
  return (
    <div className="artist-card">
      <a href={`/${artist.nameRef}`}>
        <img src={artist.avatarImg} alt="" />
        <p className="artist-card-name">{artist.name?.toUpperCase()}</p>
      </a>
    </div>
  );
});

export default ArtistCard;
