import { Setlist, Song } from "./Interfaces/Setlist.interfaces";
import Songlist from "./Songlist";

interface SongSelectionContainerProps {
  handleSelectionChange: (song: Song) => void;
  selectedSongs: Song[];
  setlistApiData: Setlist;
}

export default function SonglistContainer({
  handleSelectionChange,
  selectedSongs,
  setlistApiData,
}: SongSelectionContainerProps) {
  return (
    <div className="text-center md:flex md:flex-col md:justify-center md:h-full">
      <h2 className="my-2 text-2xl font-bold">Your setlist:</h2>
      <div  id="songlist-container" className="m-auto w-11/12 md:max-h-[85%] md:overflow-y-scroll ">
        <Songlist
          setlist={setlistApiData}
          selectedSongs={selectedSongs}
          handleSelectionChange={handleSelectionChange}
        />
      </div>
      <h2 className="font-bold my-1">{`Songs selected: ${selectedSongs.length}/${setlistApiData.songList.length}`}</h2>
      <h3 className="mb-2 hidden md:block">
        Click a song to select/deselect it from the playlist!
      </h3>
    </div>
  );
}
