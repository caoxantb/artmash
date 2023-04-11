import { component$ } from "@builder.io/qwik";
import { StyledBanner, BannerTitle } from "../styled/home.css";

const Banner = component$(() => {
  return (
    <StyledBanner>
      <BannerTitle>film-mash</BannerTitle>
      <div>
        <p>
          Are we supposed to rank films since cinema is subjective? Probably not.
        </p>
        <p>Will we do it anyway? Hell yes.</p>
      </div>
    </StyledBanner>
  );
});

export default Banner;
