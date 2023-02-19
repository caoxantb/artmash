import { component$ } from "@builder.io/qwik";

const HomeGallery = component$(({ gallery }: { gallery: Gallery }) => {
  return (
    //TODO: add "href" redirect to artist own page
    <div className="artist-card"> 
      <a href={`/${gallery._id}`}>
        <img src={gallery.avatarImg} alt="" />
        <p className="artist-card-name">{gallery.name?.toUpperCase()}</p>
      </a>
    </div>
  );
});

// const ArtistCard = component$(({ artist }: IArtist) => {
//   return (
//     <div className="artist-card">
//       <a href={`/${artist.nameRef}`}>
//         <img src={artist.avatarImg} alt="" />
//         <p className="artist-card-name">{artist.name?.toUpperCase()}</p>
//       </a>
//     </div>
//   );
// });

export default HomeGallery;
