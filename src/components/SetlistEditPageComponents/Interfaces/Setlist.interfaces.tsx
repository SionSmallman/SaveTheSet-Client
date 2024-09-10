export interface Song {
  uri: string;
  songTitle: string;
  artist: string;
  album: string;
  albumArtUrl: string;
}

export interface Setlist {
  artist: Artist;
  venue: string;
  city: string;
  date: string;
  setlistFmUrl: string;
  songList: Song[];
}

export interface PlaylistFormData {
  title: string;
  description: string;
  isPublic: boolean;
  songList: Song[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}