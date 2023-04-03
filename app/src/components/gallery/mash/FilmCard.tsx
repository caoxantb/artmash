import { component$ } from "@builder.io/qwik";

interface FilmCardProps {
  film: any;
  clickHandler: any;
  isVisible: string;
}

const FilmCard = component$(
  ({ film, clickHandler, isVisible }: FilmCardProps) => {
    return (
      <div
        class="film-card"
				// eslint-disable-next-line qwik/valid-lexical-scope
				onClick$={clickHandler}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${film?.bannerImg})`,
          backgroundSize: "cover",
          visibility: isVisible,
        }}
      >
        <div>
          <p class="film-country">
            {film?.country}, {film?.year}
          </p>
          <p class="film-name">{film?.name}</p>
          <p class="film-dir">DIRECTED BY <b>{film?.director}</b></p>
        </div>
      </div>
    );
  }
);

export default FilmCard;
