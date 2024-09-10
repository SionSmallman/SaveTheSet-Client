import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import RecentlySavedTile from "./RecentlySavedTile";
import { PlaylistObject } from "./Interfaces/Home.interfaces";

function RecentlySaved() {
  const [recentlySavedPlaylists, setRecentlySavedPlaylists] = useState<
    PlaylistObject[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRecentlySaved() {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/playlists/recent`, {})
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRecentlySavedPlaylists(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error: ", error);
        });
    }
    getRecentlySaved();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the index and loop back to the beginning if necessary
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % recentlySavedPlaylists.length,
      );
    }, 5000);
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [recentlySavedPlaylists.length]);

  return (
    <div id="recently-saved-container" className="m-auto h-full flex flex-col items-center justify-center py-5 md:w-[60vw] md:max-w-[1000px] md:flex-row" >
      <div id="recently-saved-text-container" className="w-[80vw] text-center text-white md:w-1/2 " >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem]">
          Recently Saved
        </h1>
        <p className="my-3">
          Trending setlists saved by other Save the Set users.
        </p>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-1/2">
          {recentlySavedPlaylists &&
            recentlySavedPlaylists.map((playlist, index) => (
              <div
                id="recently-saved-tile"
                key={index}
                className={`${
                  index === currentIndex ? "opacity-100" : "hidden opacity-0"
                } py-4`}
              >
                <RecentlySavedTile key={playlist.playlistId} playlist={playlist} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default RecentlySaved;
