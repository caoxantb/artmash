import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { HeaderIcon } from "../icon";
import {
  StyledHeader,
  HeaderLink,
  HeaderName,
  HeaderLogin,
  HeaderAvatar,
  AvatarLog,
} from "../styled/header.css";

const Header = component$(() => {
  const store: any = useStore(
    {
      user: {},
    },
    { deep: true }
  );

  useVisibleTask$(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      store.user = user;
    }
  });

  return (
    <StyledHeader>
      <div></div>
      <HeaderLink href="/">
        <HeaderIcon />
        <HeaderName> FILMMASH </HeaderName>
      </HeaderLink>
      {!store.user.username ? (
        <HeaderLogin href="/login">Login</HeaderLogin>
      ) : (
        <HeaderAvatar href={`/user/${store.user.username}`}>
          <AvatarLog src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </HeaderAvatar>
      )}
    </StyledHeader>
  );
});

export default Header;
