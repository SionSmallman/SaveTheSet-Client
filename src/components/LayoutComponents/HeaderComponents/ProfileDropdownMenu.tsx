import { Link } from "react-router-dom";
import { IoLogOutOutline, IoSettingsSharp } from "react-icons/io5";

interface ProfileDropdownMenuProps  {
  logout: () => void;
  setMenuIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileDropdownMenu({ logout, setMenuIsShowing }: ProfileDropdownMenuProps) {
  return (
    <div className="absolute left-[-60%] md:left-0 z-10 rounded bg-white text-center text-gray-800 drop-shadow-lg w-[33vw] md:w-full">
      <Link id="user-settings" to={"/settings"} >
        <button id="user-settings" className="w-full rounded border-b-2 border-gray-300 py-2 hover:bg-gray-200 md:px-6">
          <div className="flex items-center justify-center text-sm md:text-base">
            <IoSettingsSharp size={20} />
            <span className="ml-2">Settings</span>
          </div>
        </button>
      </Link>
      <button
        id="logout"
        className="block w-full rounded px-6 py-2 hover:bg-gray-200"
        onClick={() => {
          logout(), setMenuIsShowing(false);
        }}
        >
        <div className="flex items-center justify-center text-sm md:text-base">
          <IoLogOutOutline className="" size={20} />
          <span className="ml-2">Log out</span>
        </div>
      </button>
    </div>
  );
}
