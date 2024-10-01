import { useEffect, useState } from "react";
import Layout from "../components/LayoutComponents/Layout";
import { useAuthContext } from "../hooks/useAuthContext";
import DataTable, { TableColumn } from 'react-data-table-component';

export default function UserHistory() {
  // Get current user state from context
  const { state } = useAuthContext();
  const user = state.user;

  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);

  // Get users saved playlists from API
  useEffect(() => {
    async function getUserHistory() {
      await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/playlists/${user!.userId}`,
        { headers: {Authorization: "Bearer " + localStorage.getItem("stsToken")} }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserPlaylists(data);
        })
        .catch((error) => {
          console.error("Fetch error: ", error);
        });
    }
    getUserHistory();
  }, []);

  const columns: TableColumn<UserPlaylist>[] = [
    {
      name: "Artist Name",
      selector: row => row.artistName, 
    },
    {
      name: "Date",
      selector: row => row.date,
    },
    {
      name: "Venue",
      selector: row => row.venue,
    }, 
    {
      name: "City",
      selector: row => row.city,
    },   
    {
      name: "Playlist Link*",
      selector: row => row.spotifyPlaylistUrl,
      cell: (row) => <a href={row.spotifyPlaylistUrl} className="underline text-blue-500">Link</a>
    },
    {
      name: "Playlist Creation Date",
      selector: row => row.playlistCreationDate,
    },

  ]

  return (
    <Layout>
      <h1 className="text-center text-2xl font-extrabold my-5">Playlist History</h1>
        {user && (
          <>
            <div id="user-history-table" className="m-auto md:w-3/4 ">
              <DataTable columns={columns} data={userPlaylists} pagination paginationComponentOptions={{noRowsPerPage: true}} />
            </div>
            <p className="text-center italic text-sm my-2">*The playlist link is saved upon creation. If the playlist has been edited/deleted, then the link may be broken. </p>
          </>
        )}
    </Layout>
  );
}

interface UserPlaylist {
    artistName: string,
    city: string,
    venue: string,
    date: string,
    setlistfmurl: string,
    spotifyPlaylistUrl: string,
    playlistCreationDate: string,
  }