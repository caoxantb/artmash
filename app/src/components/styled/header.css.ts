import { styled } from "styled-vanilla-extract/qwik";

export const StyledHeader = styled.header`
  background-color: beige;
  width: 100%;
  margin: 0 auto;
  padding: 10px 0;
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