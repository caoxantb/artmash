import { styled } from "styled-vanilla-extract/qwik";

export const StyledHeader = styled.header`
  background-color: beige;
  width: 90%;
  margin: 0 auto;
  padding: 10px 5%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const HeaderLink = styled.a`
  justify-content: center;
  align-items: center;
  display: flex;
  text-decoration: none;
`;

export const HeaderName = styled.span`
  color: black;
  margin-left: 10px;
  font-size: 24px;
  font-weight: 800;
`;

export const HeaderLogin = styled.a`
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: 700;
  text-decoration: none;
  color: black;
`;

export const HeaderAvatar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const AvatarLog = styled.img`
  height: 40px;
  border-radius: 50%;
`;
