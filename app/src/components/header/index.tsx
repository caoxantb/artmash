import { component$ } from "@builder.io/qwik";
import { HeaderIcon } from "../icon";
import { StyledHeader, HeaderLink, HeaderName } from "../styled/header.css";

const Header = component$(() => {
  return (
    <StyledHeader>
      <HeaderLink href="/">
        <HeaderIcon />
        <HeaderName> SONGMASH </HeaderName>
      </HeaderLink>
    </StyledHeader>
  );
});

export default Header;
