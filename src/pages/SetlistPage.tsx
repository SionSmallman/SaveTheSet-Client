import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/LayoutComponents/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import Success from "../components/SetlistEditPageComponents/Success";
import SetlistPageLogin from "../components/SetlistEditPageComponents/SetlistPageLogin";
import PlaylistDetailsForm from "../components/SetlistEditPageComponents/PlaylistDetailsForm";
import { Setlist, PlaylistFormData, Song } from "../components/SetlistEditPageComponents/Interfaces/Setlist.interfaces";
import { SetlistContext } from "../context/SetlistContext";
import { useAuthContext } from "../hooks/useAuthContext";
import SonglistContainer from "../components/SetlistEditPageComponents/SonglistContainer";

export default function SetlistPage() {

  const [setlistApiData, setSetlistApiData] = useState<Setlist>();
  const [playlistFormData, setPlaylistFormData] = useState<PlaylistFormData>();
  const [hasLoaded, setHasLoaded] = useState(false)
  const [success, setSuccess] = useState(false);
  const [finalPlaylistUri, setFinalPlaylistURI] = useState<string>("");
  const { sid } = useParams() as { sid: string };
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get current user state from context
  const { state } = useAuthContext();
  const user = state.user;

  //FETCH: Get setlist data from API
  useEffect(() => {
    async function getSetlistData() {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/search?id=${sid}`,
        {},
      )
        .then((data) => data.json())
        .catch((error) => {
          console.error("Fetch error: ", error);
          setError("An error has occured. Please try again later. " + error);
        });
      setSetlistApiData(res);
      setSelectedSongs(res.songList);   // By default, all songs in setlist are selected
      const reformattedDate = res["date"].split("-").reverse().join("-");
      setPlaylistFormData({
        title: `${res["artist"]["name"]} - ${res["city"]}, ${reformattedDate}`,
        description: `Setlist from ${res["artist"]["name"]}, playing at ${res["venue"]}, ${res["city"]} on ${reformattedDate}`,
        isPublic: false,
        songList: res["songList"],
      });
      setHasLoaded(true);
    }
    getSetlistData();
  }, [sid]);

  const handleSelectionChange = (song: Song) => {
    if (!checkIfSongSelected(song)) {
      setSelectedSongs([...selectedSongs, song]);
    } else {
      setSelectedSongs(selectedSongs.filter((s) => s.uri !== song.uri));
    }
  };

  // Check if a given songs URI matches any uris of songs curently selected
  // Necessary because we cannot compare two song objects directly
  const checkIfSongSelected = (song: Song) => {
    if (selectedSongs.some((s) => s.uri === song.uri)) {
      return true;
    }
    return false;
  };

  return (
    <Layout>
      {/* Set context to allow setlistData to be passed later */}
      <SetlistContext.Provider value={setlistApiData}>
        <div className="flex items-center justify-center md:my-5 ">
          <div className="flex flex-col h-full w-full bg-[#b9c5da] rounded drop-shadow-2xl md:h-[80vh] md:w-[80vw] md:flex-row ">
            {!success && (
              <>
                { hasLoaded ?
                  (<>
                    {/* Left side - Form/Login */}
                    <div className="m-auto w-full md:w-2/5 md:border-r md:border-gray-300">
                      {user ? (
                        <PlaylistDetailsForm
                          initialPlaylistFormData={playlistFormData!}
                          onSuccessChange={setSuccess}
                          onFinalPlaylistChange={setFinalPlaylistURI}
                          selectedSongs={selectedSongs}
                        />
                      ) : (
                        <SetlistPageLogin />
                      )}
                    </div>
                    {/* Right side - Display song List */}
                    <div className="w-full md:w-3/5 md:py-4 ">
                      <SonglistContainer
                        handleSelectionChange={handleSelectionChange}
                        selectedSongs={selectedSongs}
                        setlistApiData={setlistApiData!}
                      />
                    </div>
                  </>)
                : (
                  // Loading state
                  <div className="m-auto text-center">
                    <LoadingSpinner />
                    {!error ? (
                      <>
                        <p>Fetching your setlist!</p>
                        <p> Larger setlists may take longer to load.</p>
                      </>
                    ) : (
                      <p>{error}</p>
                    )}
                  </div>
                  )
                }
              </>
            )}
            {success && <Success playlistUri={finalPlaylistUri} />}
          </div>
        </div>
      </SetlistContext.Provider>
    </Layout>
  );
}


      

