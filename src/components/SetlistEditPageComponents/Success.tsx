// TODO: Seprate into SuccessComponents. This JSX looks a mess at the moment...

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";

function Success({ playlistUri }: { playlistUri: string }) {
  const navigate = useNavigate();
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://open.spotify.com/playlist/${playlistUri}`,
    );
    setCopy(true);
  };
  
  // Open playlist in Spotify app
  const handleSpotifyOpen = () => {
    window.location.href = `spotify:playlist:${playlistUri}`;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-5 md:h-full">
      {/* Home button */}
      <button
        id="success-home"
        onClick={() => navigate("/")}
        className="absolute left-0 top-0 m-2 rounded-full bg-transparent bg-white p-2 font-bold text-gray-800 hover:bg-gray-200"
      >
        <IoArrowBackOutline className="inline" /> <p className="inline">Home</p>
      </button>
      {/* Success checkmark icon */}
      <IoIosCheckmarkCircleOutline className="text-8xl text-green-500 md:text-9xl" />
      {/* Display text */}
      <h1 className="font-bold md:text-3xl">Your playlist has been saved!</h1>
      <h2 className="m-3 text-center md:text-xl">
        The playlist should now be visible in your Spotify account.
      </h2>
      {/* Open in Spotify App */}
      <button
        id="success-open-spotify"
        onClick={handleSpotifyOpen}
        className="m-3 flex items-center rounded bg-black px-4 py-2 align-middle font-bold text-white hover:outline hover:outline-white"
      >
        <FaSpotify size={21} className="inline text-[#1DB954] " />{" "}
        <span className="ml-3">Open Spotify</span>
      </button>
      {/* Playlist URL share */}
      <h2 className="m-2 text-xl font-semibold">Share the playlist:</h2>
      <div className="mb-4 flex w-full flex-col justify-center items-center md:flex-row">
        <input
          id="success-playlist-link"
          type="text"
          value={`https://open.spotify.com/playlist/${playlistUri}`}
          className="focus:shadow-outline max-w-[80%] appearance-none rounded border px-3 py-2 text-center leading-tight text-gray-700 shadow focus:outline-none md:w-[35%] md:rounded-l md:rounded-r-none"
          readOnly
        />
        <button
          id="success-copy-playlist-link"
          onClick={handleCopy}
          className="my-3 min-h-[8vh] rounded bg-white px-4 py-1 font-bold text-gray-800 hover:bg-gray-200 md:m-0 md:h-full md:min-h-0 md:min-w-0 md:rounded-l-none md:rounded-r"
        >
          {copy ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default Success;
