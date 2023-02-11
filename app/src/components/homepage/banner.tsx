import { component$ } from "@builder.io/qwik";

const Banner = component$(() => {
  return (
    <div className="banner">
      <div className="banner-title">song-mash</div>
      <div>
        <p>
          Are we supposed to rank music since art is subjective? Probably not.
        </p>
        <p>Will we do it anyway? Fuck yes.</p>
      </div>
    </div>
  );
});

export default Banner;
