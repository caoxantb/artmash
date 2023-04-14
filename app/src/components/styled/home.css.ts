import { styled } from "styled-vanilla-extract/qwik";

export const StyledHome = styled.div`
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    fixed url("https://i.imgur.com/sY3wJLt.jpg") center/cover no-repeat;
  height: 100%;
  min-height: 100vh;
  color: whitesmoke;
`;

export const StyledBanner = styled.div`
  padding: 50px;
`;

export const BannerTitle = styled.div`
  font-weight: 700;
  font-size: 60px;
  padding: 20px 0;
`;

export const StyledGalleries = styled.div`
  padding: 50px 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  margin: 0 10%;
  @media screen and (min-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const CardLink = styled.a`
  color: whitesmoke;
  text-decoration: none;
`;

export const StyledGalleryCard = styled.div`
  padding: 0 5%;
`;

export const CardImage = styled.img`
  width: 100%;
  border-radius: 50%;
  margin-bottom: 20px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const CardName = styled.p`
  font-weight: 700;
  font-size: 20px;
`;
