// The keys in this interface are PascalCase instead of camelCase as that's how db columns are named
// Easier to just keep this casing for now, rather than reprocessing everything on server
export interface PlaylistObject {
  playlistId: number;
  artistName: string;
  spotifyArtistId: string;
  artistImageUrl: string;
  venue: string;
  city: string;
  date: string;
}
