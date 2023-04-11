import { component$ } from "@builder.io/qwik";

const LoadingIcon = component$(() => {
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

export default LoadingIcon;