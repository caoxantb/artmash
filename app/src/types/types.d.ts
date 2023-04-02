type Gallery = {
  _id: string;
  user: string;
  name?: string;
  bannerImg?: string;
  avatarImg?: string;
  description?: string;
  summary?: string;
  entryId?: string;
};

type Galleries = [Gallery] | []

type Film = {
  bannerImg?: string;
  country?: string;
  director?: string;
  entryId?: string;
  name?: string;
  points: number;
  posterImg?: string;
  synopsis?: string;
  year?: number;
  youtubeSrc?: string;
  _id: string;
}

type Films = [Film] | []

