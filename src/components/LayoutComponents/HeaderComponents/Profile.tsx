import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ProfileDropdownMenu from "./ProfileDropdownMenu"; 

function Profile() {
  const [menuIsShowing, setMenuIsShowing] = useState(false);

  const { logout } = useLogout();

  // Get current user state from context
  const { state } = useAuthContext();
  const user = state.user!;

  // Toggle menu
  const handleMenu = () => {
    setMenuIsShowing(!menuIsShowing);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <div className="relative">
          <button
            id="user-dropdown"
            className="flex items-center rounded font-semibold bg-[#273955] text-white"
            onClick={handleMenu}
          >
            {/* Spotify image */}
            <img
              id="spotify-profile-image"
              src={user.profileImageUrl ? user.profileImageUrl : "/static/images/default-profile-image.png"}
              className="inline max-h-[40px] rounded-full"
              alt="Spotify profile image"
            ></img>
            {/* Spotify display name - Only shown in non-mobile view*/}
            <span id="spotify-profile-displayname" className="hidden px-2 md:inline">{user.displayName}</span>
            <FaAngleDown className="mr-1 inline align-text-bottom" />
          </button>
          {/* Profile dropdown menu */}
          {menuIsShowing && (
          <ProfileDropdownMenu
            logout={logout}
            setMenuIsShowing={setMenuIsShowing}
          />
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;


      

