import { PlaylistObject } from "./Interfaces/Home.interfaces";

function RecentlySavedTile({ playlist }: { playlist: PlaylistObject }) {
  return (
    <div
      id="mask"
      className="m-auto h-3/4 w-3/4 max-w-[300px] animate-elementFadeInAndOut text-gray-600 rounded border-2 border-gray-400 drop-shadow-lg"
    >
      <div className="m-auto max-w-[60vw] aspect-square overflow-hidden object-cover drop-shadow-lg">
        <img src={playlist.artistImageUrl} className="m-auto h-auto" alt={playlist.artistName + 'Spotify image'}></img>
      </div>
      <div className="w-full bg-white py-1 font-bold md:text-base">
        {/* Need to link artist name back to page for spotify brand guidelines */}
        <a
          target="__blank"
          href={"https://open.spotify.com/artist/" + playlist.spotifyArtistId}
        >
          <p>{playlist.artistName}</p>
        </a>
        <p>{playlist.venue}</p>
        <p>{playlist.city}</p>
        <p>{playlist.date}</p>
      </div>
    </div>
  );
}

export default RecentlySavedTile;
