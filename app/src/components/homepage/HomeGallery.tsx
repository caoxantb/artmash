import { component$ } from "@builder.io/qwik";

const HomeGallery = component$(({ gallery }: { gallery: Gallery }) => {
  return (
    <div class="artist-card">
      <a href={`/${gallery._id}`}>
        <img src={gallery.avatarImg} alt="" />
        <p class="artist-card-name">{gallery.name?.toUpperCase()}</p>
      </a>
    </div>
  );
});

export default HomeGallery;
