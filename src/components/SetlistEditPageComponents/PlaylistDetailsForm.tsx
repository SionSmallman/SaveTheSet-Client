import { useState, useContext } from "react";
import { SetlistContext } from "../../context/SetlistContext";
import { PlaylistFormData, Song } from "./Interfaces/Setlist.interfaces";
import LoadingSpinner from "../LoadingSpinner";

type Props = {
  onSuccessChange: (newType: boolean) => void;
  onFinalPlaylistChange: (newType: string) => void;
  initialPlaylistFormData: PlaylistFormData;
  selectedSongs: Song[];
};

function PlaylistDetailsForm({
  initialPlaylistFormData,
  selectedSongs,
  onSuccessChange,
  onFinalPlaylistChange,
}: Props) {
  // Get setlist context to save into DB
  const setlist = useContext(SetlistContext);

  const [playlistFormData, setPlaylistFormData] = useState<PlaylistFormData>(
    initialPlaylistFormData,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div id="form" className="text-center py-5 w-full">
      <h1 className="text-2xl font-bold">Customize your playlist:</h1>
      {/* Playlist title input */}
      <div className="my-3">
        <label className="m-auto w-3/4 text-left mb-2 block font-bold uppercase tracking-wide text-gray-700" htmlFor="form-playlist-name">
          Playlist Name:
        </label>
        <input
          onChange={(e) =>
            setPlaylistFormData({
              ...playlistFormData,
              title: e.target.value,
            })
          }
          type="text"
          id="form-playlist-name"
          name="name"
          defaultValue={playlistFormData["title"]}
          required
          maxLength={100}
          className={`m-auto block w-3/4 appearance-none rounded bg-gray-100 px-4 py-3 leading-tight text-gray-700 shadow-xl focus:bg-white focus:outline focus:outline-gray-400  ${
            playlistFormData["title"] == "" && "mb-0 border-2 border-red-600"
          }`}
        />
        {/* CHECK: If playlist doesn't have a name, show error */}
        {playlistFormData["title"] == "" && (
          <div id="playlist-name-error" className="m-auto block w-3/4 text-left">
            <h3 className=" font-bold text-red-700 underline">
              Playlist Name is required
            </h3>
          </div>
        )}
      </div>

      {/* Description input */}
      <div className="my-3">
        <div className="playlist-desc-label m-auto block w-3/4 text-left">
          <label className="mb-2 block font-bold uppercase tracking-wide text-gray-700" htmlFor="form-playlist-description">
            Description:
          </label>
        </div>
        <textarea
          onChange={(e) =>
            setPlaylistFormData({
              ...playlistFormData,
              description: e.target.value,
            })
          }
          id="form-playlist-description"
          rows={5}
          name="desc"
          defaultValue={playlistFormData["description"]}
          required
          maxLength={300}
          className="mx-auto block w-3/4 resize-none appearance-none rounded bg-gray-100 px-4 py-3 leading-tight text-gray-700 shadow-xl focus:bg-white focus:outline focus:outline-gray-400 "
        />
      </div>
      {/* Public checklist */}
      <div className="my-3">
        <label className="mb-1 block font-bold uppercase tracking-wide text-gray-700" htmlFor="form-playlist-public">
          Make playlist public?
        </label>
        <input
          type="checkbox"
          id="form-playlist-public"
          className="m-auto block"
          onChange={(e) =>
            setPlaylistFormData({
              ...playlistFormData,
              isPublic: e.target.checked,
            })
          }
        />
      </div>
      {/* Submit button */}
      <button
        id="form-submit"
        className="w-[150px] rounded bg-white px-2 py-2 font-semibold text-gray-800 shadow-lg hover:bg-gray-200"
        onClick={handleSaveToPlaylist}
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : "Save to Playlist"}
      </button>
      {/* If an error occurs, display at bottom of form */}
      <div className="flex flex-col">
        {error && (
          <div id="form-error" className="block">
            <h3 className="font-bold text-red-700 underline">{error}</h3>
          </div>
        )}
      </div>
    </div>
  );

  // POST request to create playlist
  // If successful, set success and final playlist links in parent component.
  // If failure (e.g spotify/our api is down, return an error message)
  async function handleSaveToPlaylist() {
    if (validateForm(playlistFormData) && validateSonglist(selectedSongs)) {
      setIsLoading(true);
      setError(null);

      // Replace default setlist songlist(which includes all song) with the subset of user selected songs
      const userSelectedSongsSetlist = { ...setlist, songList: selectedSongs };
      const playlistSaveCall = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/playlists`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("stsToken"),
            "Client-Access-Token-Expiry": localStorage.getItem(
              "spAccessTokenExpiry",
            )!,
            "Content-Type": "application/json",
          },
          //combine out form data and setlist data (setlist data used for saving to DB)
          body: JSON.stringify({
            ...playlistFormData,
            ...userSelectedSongsSetlist,
          }),
        },
      )
        .then((response) => {
          onSuccessChange(true);
          return response.json();
        })
        .then((data) => {
          onFinalPlaylistChange(data.playlistID);
          return data;
        })
        .catch((error) => {
          console.error("Fetch error: ", error);
          setError(
            "An error has occured while saving setlist to Spotify. Please try again later. " +
              error,
          );
        });

      //TODO: Refactor this ugly mess
      // If response includes new client access token expiry, update storage
      if (
        playlistSaveCall[
          "newSpotifyAccessTokenExpiry" as keyof typeof playlistSaveCall
        ]
      ) {
        localStorage.setItem(
          "spAccessTokenExpiry",
          playlistSaveCall[
            "newSpotifyAccessTokenExpiry" as keyof typeof playlistSaveCall
          ],
        );
      }
      // If response includes new client access token expiry, update storage
      if (playlistSaveCall["newStsToken" as keyof typeof playlistSaveCall]) {
        localStorage.setItem(
          "stsToken",
          playlistSaveCall["newStsToken" as keyof typeof playlistSaveCall],
        );
      }
      setIsLoading(false);
    }
  }

  // Form validation
  // Check if playlist has title, if not return error
  function validateForm(form: PlaylistFormData) {
    if (form["title"] == "") {
      setError("Playlist Name is required");
      return false;
    }
    return true;
  }

  function validateSonglist(songlist: Song[]) {
    if (songlist.length == 0) {
      setError("You must select at least one song!");
      return false;
    }
    return true;
  }
}

export default PlaylistDetailsForm;
