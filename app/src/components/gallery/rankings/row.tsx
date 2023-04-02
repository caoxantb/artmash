import {
  component$,
  $,
  useStore,
  useSignal,
  useClientEffect$,
} from "@builder.io/qwik";
import SortIcon from "../../icon/Sort";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
interface FilmRankingProps {
  film: Film;
  index: number;
  innerWidth: number;
  sortHandler: any;
  sortBy: {
    column: "score" | "film" | "year" | "director" | "country";
    direction: "asc" | "desc";
  };
}

type FilmRankingHeadProps = Pick<
  FilmRankingProps,
  "innerWidth" | "sortHandler" | "sortBy"
>;
type FilmRankingRowProps = Omit<FilmRankingProps, "sortHandler" | "sortBy">;

export const FilmRankingHeader = component$(
  ({ innerWidth, sortHandler, sortBy }: FilmRankingHeadProps) => {
    return (
      <div className="film-ranking film-ranking-head">
        <div className="">#</div>
        <div className="" onClick$={() => sortHandler("film")}>
          Film <SortIcon sortBy={sortBy} type="film" />
        </div>
        <div className="" onClick$={() => sortHandler("director")}>
          Director(s) <SortIcon sortBy={sortBy} type="director" />
        </div>
        {innerWidth >= 768 && (
          <>
            <div className="" onClick$={() => sortHandler("year")}>
              Year <SortIcon sortBy={sortBy} type="year" />
            </div>
            <div className="" onClick$={() => sortHandler("country")}>
              Country <SortIcon sortBy={sortBy} type="country" />
            </div>
          </>
        )}
        <div className="" onClick$={() => sortHandler("score")}>
          Points <SortIcon sortBy={sortBy} type="score" />
        </div>
      </div>
    );
  }
);

export const FilmRankingRow = component$(
  ({ film, index }: FilmRankingRowProps) => {
    const store: { isOpening: boolean; scrollHeight: number } = useStore({
      isOpening: false,
      scrollHeight: 0,
    });
    const accordionRef = useSignal<Element>();

    useClientEffect$(() => {
      if (accordionRef.value) {
        const posterHeight = (accordionRef.value.scrollWidth * 4) / 15;
        store.scrollHeight = Math.max(
          accordionRef.value.scrollHeight,
          posterHeight
        );
      }
    });

    return (
      <>
        <div
          className="film-ranking film-ranking-row"
          onClick$={$(() => {
            store.isOpening = !store.isOpening;
          })}
        >
          <div className="">{index + 1}</div>
          <div className="">{film?.name}</div>
          <div className="">{film?.director}</div>
          {innerWidth >= 768 && (
            <>
              <div>{film?.year}</div>
              <div>{film?.country}</div>
            </>
          )}
          <div className="">{film?.points}</div>
        </div>
        <div
          ref={accordionRef}
          className="film-accordion"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${film?.bannerImg})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            maxHeight: store.isOpening ? `${store.scrollHeight + 40}px` : "0px",
          }}
        >
          <div style={{padding: '20px', display: 'flex'}}>
            <img
              className="film-poster"
              src={`${film?.posterImg}`}
              alt=""
              loading="lazy"
            ></img>
            <div className="film-details">
              <p className="film-title">{film.name?.toUpperCase()}</p>
              <p className="film-dir-acc">
                Directed by <b>{film?.director}</b>
              </p>
              <p className="film-dir-acc">
                {film?.country}, {film?.year}
              </p>
              <div
                dangerouslySetInnerHTML={`${sanitizeHtml(
                  marked.parse(film.synopsis || "")
                )}`}
                className="film-synopsis"
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
