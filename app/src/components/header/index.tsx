import { component$, useStyles$ } from "@builder.io/qwik";
import HeaderIcon from "../icon/Header";
import HeaderStyles from "~/styles/header.css?inline";

const Header = component$(() => {
  useStyles$(HeaderStyles);

  return (
    <header>
      <a href="/">
        <HeaderIcon />
        <span class="app-name"> SONGMASH </span>
      </a>
    </header>
  );
});

export default Header;
