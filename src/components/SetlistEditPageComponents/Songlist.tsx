import SonglistItem from "./SonglistItem";
import { Setlist, Song } from "./Interfaces/Setlist.interfaces";
interface SonglistProps {
  setlist: Setlist;
  selectedSongs: Song[];
  handleSelectionChange: (s: Song) => void;
}

function Songlist({
  setlist,
  selectedSongs,
  handleSelectionChange,
}: SonglistProps) {
  // Check if a given songs URI matches any uris of songs curently selected
  // Necessary because we cannot compare two song objects directly
  const isSongSelected = (song: Song) => {
    if (selectedSongs.some((s) => s.uri === song.uri)) {
      return true;
    }
    return false;
  };

  return (
    <>
      {setlist.songList.map((song) => {
        return (
          <SonglistItem
            key={song["uri"]}
            song={song}
            isSelected={isSongSelected(song)}
            handleSelectionChange={handleSelectionChange}
          />
        );
      })}
    </>
  );
}

export default Songlist;
