import { Link } from "react-router-dom";
import Profile from "./HeaderComponents/Profile";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoginButton from "../AuthComponents/LoginButton";

export default function Header() {
  // Get current user state from context
  const { state } = useAuthContext();
  const user = state.user;

  return (
    <header className="sticky top-0 z-10 flex h-[60px] md:h-[80px] w-full items-center justify-center border-b border-w bg-[#273955] text-white">
      <div className={user ? "w-2/3 " : "w-full md:w-2/3"}>
        <h1 className="relative text-center font-bold tracking-tight md:text-center">
          <Link to="/">
            <span className="tracking-tight text-3xl md:text-5xl text-[#0096FF]">Save<span className="text-white" >The</span>Set</span>
          </Link>
          <span className="absolute top-0 my-4 ml-[5px] text-xs px-1  border rounded text-gray-300 border-gray-300 cursor-default">BETA</span>
        </h1>
      </div>
      {user ? (
        <div className="w-1/3 md:w-1/2 ">
          <Profile />
        </div>
      ) : (
        <div className="hidden md:block md:w-1/2">
          <LoginButton />
        </div>
      )}
    </header>
  );
}
