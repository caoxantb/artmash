import { component$ } from "@builder.io/qwik";
import { HeaderIcon } from "../icon";
import { StyledHeader, HeaderLink, HeaderName, HeaderLogin } from "../styled/header.css";

const Header = component$(() => {
  return (
    <StyledHeader>
      <div></div>
      <HeaderLink href="/">
        <HeaderIcon />
        <HeaderName> FILMMASH </HeaderName>
      </HeaderLink>
      <HeaderLogin href="/login">Login</HeaderLogin>
    </StyledHeader>
  );
});

export default Header;
