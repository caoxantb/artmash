import { component$, type QRL } from "@builder.io/qwik";
import { GalleryToggle, StyledNavigator, active } from "../styled/gallery.css";

interface NavigatorProps {
  clickHandler: QRL<(e: any) => void>;
  toggle: "overview" | "mash" | "rankings";
}

const Navigator = component$(({ clickHandler, toggle }: NavigatorProps) => {
  return (
    <StyledNavigator>
      <GalleryToggle
        id="overview"
        class={toggle === "overview" ? active : ""}
        onClick$={clickHandler}
      >
        OVERVIEW
      </GalleryToggle>
      <GalleryToggle
        id="mash"
        class={toggle === "mash" ? active : ""}
        onClick$={clickHandler}
      >
        SONG • MASH
      </GalleryToggle>
      <GalleryToggle
        id="rankings"
        class={toggle === "rankings" ? active : ""}
        onClick$={clickHandler}
      >
        RANKINGS
      </GalleryToggle>
    </StyledNavigator>
  );
});

export default Navigator;
