import { component$, QRL } from "@builder.io/qwik";
import ArtistDurationIcon from "../../icon/duration";
import ArtistSortIcon from "../../icon/sort";

interface ArtistRankingProps {
  track: Track;
  index: number;
  sortHandler: any;
  innerWidth: number;
  sortBy: {
    column: "score" | "track" | "release" | "duration";
    direction: "asc" | "desc" | "none";
  };
}

type ArtistRankingHeadProps = Pick<
  ArtistRankingProps,
  "innerWidth" | "sortHandler" | "sortBy"
>;
type ArtistRankingRowProps = Omit<ArtistRankingProps, "sortHandler" | "sortBy">;

export const ArtistRankingHead = component$(
  ({ innerWidth, sortHandler, sortBy }: ArtistRankingHeadProps) => {
    console.log(sortBy);

    return (
      <div className="artist-row label">
        <div className="track-rankings track-rankings-no">#</div>
        <div></div>
        <div onClick$={() => sortHandler("track")} className="track-rankings">
          Tracks
          <ArtistSortIcon sortBy={sortBy} type="track" />
        </div>
        <div
          onClick$={() => sortHandler("score")}
          className="track-rankings track-rankings-score"
        >
          Score
          <ArtistSortIcon sortBy={sortBy} type="score" />
        </div>
        {innerWidth >= 768 ? (
          <>
            <div
              onClick$={() => sortHandler("release")}
              className="track-rankings track-rankings-album"
            >
              Release
              <ArtistSortIcon sortBy={sortBy} type="release" />
            </div>
            <div
              onClick$={() => sortHandler("duration")}
              className="track-rankings track-rankings-duration"
            >
              <ArtistDurationIcon />
              <ArtistSortIcon sortBy={sortBy} type="duration" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export const ArtistRankingRow = component$(
  ({ track, index }: ArtistRankingRowProps) => {
    return (
      <div className="artist-row">
        <div className="track-rankings track-rankings-no">{index + 1}</div>
        <div className="track-rankings track-rankings-img">
          <img src={track.image} alt="" loading="lazy" />
        </div>
        <div className="track-rankings track-rankings-title">
          <div className="track-rankings-song-name">{track.title}</div>
          <div>{track.artist}</div>
        </div>
        <div className="track-rankings track-rankings-score">
          {track.points}
        </div>
        {innerWidth >= 768 ? (
          <>
            {" "}
            <div className="track-rankings track-rankings-album">
              {track.release?.discType} • {track.release?.title} • {track.year}
            </div>
            <div className="track-rankings track-rankings-duration">
              {track.duration}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
