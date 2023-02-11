type Artist = {
	name?: string,
  nameRef: string,
  playlistURL?: string,
  bannerImg?: string,
  avatarImg?: string,
  activeYears?: string,
  description?: string,
  members?: [string],
}

type Artists = [Artist] | []

type Track = {
  _id: string,
  index?: number,
  title?: string,
  artist?: string,
  release?: {
    discType: string,
    title: string,
  },
  year?: number,
  duration?: string,
  image?: string,
  src?: string,
  points?: number,
}

type Tracks = [Track] | []

interface IArtist {
  artist: Artist
}

type Mash = {
  indexes: [Number];
  artistRef: String;
  leftWin: Number;
  rightWin: Number;
}
