import { component$, useStyles$ } from "@builder.io/qwik";
import HeaderIcon from "../icon/Header";
import HeaderStyles from "~/styles/header.css";

const Header = component$(() => {
  useStyles$(HeaderStyles);

  return (
    <header>
      <a href="/">
        <HeaderIcon />
        <span className="app-name"> SONGMASH </span>
      </a>
    </header>
  );
});

export default Header;
