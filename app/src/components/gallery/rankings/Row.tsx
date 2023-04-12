import { component$, $, useStore, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { StyledRow, RowAccordion, AccordionWrap, FilmPoster, FilmRowInfo, FilmRowName, FilmRowSynopsis } from "~/components/styled/rankings.css";
import { SortIcon } from "../../icon";

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
      <StyledRow>
        <div>#</div>
        <div onClick$={() => sortHandler("film")}>
          Film <SortIcon sortBy={sortBy} type="film" />
        </div>
        <div onClick$={() => sortHandler("director")}>
          Director(s) <SortIcon sortBy={sortBy} type="director" />
        </div>
        {innerWidth >= 768 && (
          <>
            <div onClick$={() => sortHandler("year")}>
              Year <SortIcon sortBy={sortBy} type="year" />
            </div>
            <div onClick$={() => sortHandler("country")}>
              Country <SortIcon sortBy={sortBy} type="country" />
            </div>
          </>
        )}
        <div onClick$={() => sortHandler("score")}>
          Points <SortIcon sortBy={sortBy} type="score" />
        </div>
      </StyledRow>
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

    useVisibleTask$(() => {
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
        <StyledRow
          onClick$={$(() => {
            store.isOpening = !store.isOpening;
          })}
        >
          <div class="">{index + 1}</div>
          <div class="">{film?.name}</div>
          <div class="">{film?.director}</div>
          {innerWidth >= 768 && (
            <>
              <div>{film?.year}</div>
              <div>{film?.country}</div>
            </>
          )}
          <div class="">{film?.points}</div>
        </StyledRow>
        <RowAccordion
          ref={accordionRef}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${film?.bannerImg})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            maxHeight: store.isOpening ? `${store.scrollHeight + 40}px` : "0px",
          }}
        >
          <AccordionWrap>
            <FilmPoster
              class="film-poster"
              src={`${film?.posterImg}`}
              alt=""
              loading="lazy"
            />
            <div>
              <FilmRowName>{film.name?.toUpperCase()}</FilmRowName>
              <FilmRowInfo>
                Directed by <b>{film?.director}</b>
              </FilmRowInfo>
              <FilmRowInfo>
                {film?.country}, {film?.year}
              </FilmRowInfo>
              <FilmRowSynopsis
                dangerouslySetInnerHTML={`${sanitizeHtml(
                  marked.parse(film.synopsis || "")
                )}`}
                class="film-synopsis"
              />
            </div>
          </AccordionWrap>
        </RowAccordion>
      </>
    );
  }
);