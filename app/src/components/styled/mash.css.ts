import { styled } from "styled-vanilla-extract/qwik";

export const StyledMash = styled.div`
  text-align: center;
  margin: 0 7% 80px;
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 425px) {
    margin: 0 10% 80px;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 40% 20% 40%;
  }
`;

export const StyledFilmCard = styled.div`
  padding: 5%;
  display: flex;
  justify-content: left;
  align-items: end;
  aspect-ratio: 16 / 9;
  text-transform: uppercase;
  color: whitesmoke;
  text-align: left;
  cursor: pointer;
`;

export const FilmCountry = styled.p`
  font-size: 1rem;
  margin: 0px;
`;

export const FilmDirector = styled.p`
  font-size: 1rem;
  margin: 0px;
`;

export const FilmName = styled.p`
  font-size: 2rem;
  font-weight: 900;
  margin: 0px;
`;
