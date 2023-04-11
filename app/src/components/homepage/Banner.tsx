import { component$ } from "@builder.io/qwik";

const Banner = component$(() => {
  return (
    <div class="banner">
      <div class="banner-title">song-mash</div>
      <div>
        <p>
          Are we supposed to rank films since it is subjective? Probably not.
        </p>
        <p>Will we do it anyway? Hell yes.</p>
      </div>
    </div>
  );
});

export default Banner;
