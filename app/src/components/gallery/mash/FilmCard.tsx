import { component$ } from "@builder.io/qwik";
import { StyledFilmCard, FilmName, FilmCountry, FilmDirector } from "~/components/styled/mash.css";

interface FilmCardProps {
  film: any;
  clickHandler: any;
  isVisible: string;
}

const FilmCard = component$(
  ({ film, clickHandler, isVisible }: FilmCardProps) => {
    return (
      <StyledFilmCard
				onClick$={clickHandler}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${film?.bannerImg})`,
          backgroundSize: "cover",
          visibility: isVisible,
        }}
      >
        <div>
          <FilmCountry>
            {film?.country}, {film?.year}
          </FilmCountry>
          <FilmName>{film?.name}</FilmName>
          <FilmDirector>DIRECTED BY <b>{film?.director}</b></FilmDirector>
        </div>
      </StyledFilmCard>
    );
  }
);

export default FilmCard;
