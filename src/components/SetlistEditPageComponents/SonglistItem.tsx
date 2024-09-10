import { Song } from "./Interfaces/Setlist.interfaces";

interface ISonglistItemTypes {
  song: Song;
  isSelected: boolean;
  handleSelectionChange: (s: Song) => void;
}

export default function SonglistItem({
  song,
  isSelected,
  handleSelectionChange,
}: ISonglistItemTypes) {
  return (
    <div
      id="songlist-song"
      className={`m-2 flex flex-row justify-center cursor-pointer select-none rounded bg-[#7F7EA1] py-1 text-white shadow-md ${
        isSelected ? "opacity-100 scale-100 duration-150" : "opacity-40 scale-95 duration-150"
      } [&>*]:m-auto`}
      onClick={() => handleSelectionChange(song)}
    >
      {/* artist/song */}
      <div className="w-1/2 text-center">
        <h3
          id="songlist-song-title"
          className="font-semibold md:text-lg"
          title={song.songTitle}
        >
          {truncateString(song.songTitle, 35)}
        </h3>
        <h4
          id="songlist-song-artist"
          className="text-md text-white"
          title={song.artist}
        >
          {song.artist}
        </h4>
      </div>
      {/* album */}
      <div className="w-1/2 flex flex-row items-center text-start">
        <img
          id="songlist-song-albumart"
          src={song.albumArtUrl}
          title={song.album}
          alt={song.album}
          className="m-auto max-h-14 w-auto"
        />
        <span id="songlist-song-album" title={song.album} className="w-4/5 px-2">
          {song.album}
        </span>
      </div>
    </div>
  );

  function truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }
}
