import { styled } from "styled-vanilla-extract/qwik";

export const StyledRankings = styled.div`
  margin: 0 0 80px;
  @media screen and (min-width: 1024px) {
    margin: 0 10% 80px;
  }
`;

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 5% 40% 40% 15%;
  box-sizing: border-box;
  /* border: 1px solid rgb(2, 2, 2); */
  padding: 15px 10px;
  font-weight: 400;
  height: auto;
  min-height: 40px;
  user-select: none;
  @media screen and (min-width: 768px) {
    grid-template-columns: 5% 30% 30% 10% 15% 10%;
  }
`;

export const RowAccordion = styled.div`
  display: flex;
  padding: 0px;
  color: whitesmoke;
  max-height: 0px;
  overflow: hidden;
  -moz-transition: max-height 0.5s;
  -ms-transition: max-height 0.5s;
  -o-transition: max-height 0.5s;
  -webkit-transition: max-height 0.5s;
  transition: max-height 0.5s;
`;

export const AccordionWrap = styled.div`
  padding: 20px;
  display: flex;
`;

export const FilmPoster = styled.img`
  width: 20%;
  aspect-ratio: 3 / 4;
  margin-right: 20px;
`;

export const FilmRowName = styled.p`
  font-size: 3rem;
  font-weight: 900;
  margin: 5px 0;
`;

export const FilmRowInfo = styled.p`
  font-size: 1rem;
  margin: 5px 0;
`;

export const FilmRowSynopsis = styled.div`
  font-size: 1rem;
  line-height: 30px;
`;
