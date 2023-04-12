import { styled } from "styled-vanilla-extract/qwik";

export const StyledOverview = styled.div`
  margin: 0 10%;
  text-align: center;
  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

export const GalleryAvatar = styled.div`
  padding: 0 2%;
  float: left;
  width: 100%;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 36%;
  }
`;

export const AvatarImage = styled.img`
  width: 96%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: block;
`;

export const GalleryName = styled.p`
  font-size: 50px;
  font-weight: 700;
  margin: 0 0 20px 0;
  -webkit-hyphens: auto;
  hyphens: auto;
`;

export const GallerySummary = styled.div`
  font-weight: 500;
  margin: 0 0 20px 0;
  line-height: 40px;
`;

export const GalleryDescription = styled.div`
  line-height: 40px;
  font-weight: 300;
`;
