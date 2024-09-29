import { useEffect, useState } from "react";
import Layout from "../components/LayoutComponents/Layout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function UserHistory() {
  // Get current user state from context
  const { state } = useAuthContext();
  const user = state.user;

  const [userPlaylists, setUserPlaylists] = useState();

  // Get all playlists for user
  // display in scrollable table

  useEffect(() => {
    async function getUserHistory() {
      await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/playlists/${user?.userId}`,
        {},
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Fetch error: ", error);
        });
    }
    getUserHistory();
  }, []);

  return (
    <Layout>
      {user && (
        <>
          <div>test</div>
        </>
      )}
    </Layout>
  );
}
