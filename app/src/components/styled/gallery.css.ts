import { styled, style } from "styled-vanilla-extract/qwik";

export const GalleryBanner = styled.div`
  text-align: center;
  display: flex;
  height: 100vh;
  color: whitesmoke;
  justify-content: center;
  align-items: center;
`;

export const GalleryTitle = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 60px;
  letter-spacing: 2px;
  -webkit-hyphens: auto;
  hyphens: auto;
  @media screen and (min-width: 425px) {
    font-size: 70px;
  }
  @media screen and (min-width: 768px) {
    font-size: 80px;
  }
`;

export const GallerySection = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const StyledNavigator = styled.div`
  text-align: center;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  gap: 20px;
  margin: 0 10% 80px;
  cursor: pointer;
  user-select: none;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0px;
  }
`;

export const active = style({
  fontWeight: "700 !important",
  borderBottom: "1px solid rgb(0, 0, 0) !important",
});

export const GalleryToggle = styled.div`
  border-bottom: 1px solid rgb(219, 207, 207);
  padding-bottom: 8px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 25px;
  box-shadow: 1px #888888;
`;
