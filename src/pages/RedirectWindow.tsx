import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/LayoutComponents/Layout";
import LoadingSpinner from "../components/LoadingSpinner";


//after Spotify callback, set client token and expiry in local storage, then close window
function RedirectWindow() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    // Get tokens and expiry from search params and save to local storage
    localStorage.setItem("stsToken", searchParams.get("token")!);
    localStorage.setItem("spAccessTokenExpiry", searchParams.get("expiresIn")!);
    
    // If for any reason the STS token expiry time is changed, this needs to be updated
    localStorage.setItem(
      "stsTokenExpiry",
      String(Math.floor(Date.now() / 1000 + 1209600)),
    ); // 1209600 seconds = 14 days.
    
    //wait for profile data, then close window and return focus to opener
    getProfileData().then(window.opener.focus());
    setTimeout(window.close, 500);
  }, [searchParams]);

  async function getProfileData() {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("stsToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("spProfile", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  }

  return (
    <Layout>
      <div className="m-auto">
        <div>
          <LoadingSpinner />
          <p>Redirecting...</p>
        </div>
      </div>
    </Layout>
  );
}

export default RedirectWindow;
