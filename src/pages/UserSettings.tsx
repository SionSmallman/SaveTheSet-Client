import Layout from "../components/LayoutComponents/Layout";
import AccountSettings from "../components/SettingsComponents/AccountSettings";
import { useAuthContext } from "../hooks/useAuthContext";

function UserSettings() {
  // Get current user state from context
  const { state } = useAuthContext();
  const user = state.user;

  return (
    <Layout>
      {user && (
        <>
          <div className="flex w-full items-center justify-center">
            <div className="py-3">
              <img
                src={user.profileImageUrl}
                className="inline max-h-[40px] rounded-full"
              ></img>
              {/* Spotify display name */}
              <span className="px-2 text-lg font-extrabold md:inline">
                {user.displayName} ({user.userId})
              </span>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center md:flex-row">
            {/* When settings menu gets big enough, can add settings catagories to the left with react-scroll to jump to them */}
            {/* Since we only have limited settings at the moment, keep simple */}
            {/* <div className="catagories h-full w-1/4 text-center">
              <h1>Account settings</h1>
            </div> */}
            <div className="settings  px-5">
              <AccountSettings />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default UserSettings;

// TO DO:
// FINISH FRONT END
// NEW API ROUTE THAT DELETES ALL DATA IN DB :)

// Settings design:
// Left hand side: setting catagories
// right hand side: settings list
// users can change catagory by clicking the catagory from the left hand side
// store current catagory in URL param
