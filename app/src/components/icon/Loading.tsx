import { component$ } from "@builder.io/qwik";

const ArtistLoadingIcon = component$(() => {
  return (
    <div class="music-loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
  );
});

export default ArtistLoadingIcon;