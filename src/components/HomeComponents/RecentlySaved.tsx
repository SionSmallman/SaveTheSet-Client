import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from "../../components/LoadingSpinner";
import RecentlySavedTile from "./RecentlySavedTile";
import { PlaylistObject } from "./Interfaces/Home.interfaces";

function RecentlySaved() {
  const {isPending, isSuccess, isError, data, error} = useQuery({
    queryKey: ['recentlySaved'],
    queryFn: () => fetch(`${import.meta.env.VITE_SERVER_URL}/api/playlists/recent`).then((response) => response.json()),
  });

  // Loop through to display the recently saved setlists
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (isSuccess) {
      const intervalId = setInterval(() => {
        // Increment the index and loop back to the beginning if necessary
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % data.length,
        );
      }, 5000);
      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId); 
    }
  }, [data]);

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
      {isPending && <LoadingSpinner />}
      {isError && 
          <p className="text-lgl text-white">{error.message}. This is likely due to the server cold starting (thanks Azure free tier!). Please wait 5 seconds then refresh the page!</p>
      }
      {isSuccess &&
        <div className="w-1/2">
          {data.map((playlist: PlaylistObject, index: number) => (
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
      }
    </div>
  );
}

export default RecentlySaved;
