import { useLogin } from "../../hooks/useLogin";
import { FaSpotify } from "react-icons/fa6";

function LoginButton() {
  const { login } = useLogin();

  return (
    <div className="flex w-full items-center justify-center text-center">
      <button
        id="login-button"
        className="m-2 flex items-center rounded border border-gray-400 bg-black px-4 py-2 font-semibold text-white shadow hover:bg-gray-900"
        onClick={() => login()}
      >
        <FaSpotify size={21} className="text-[#1DB954]" />
        <span className="ml-3">Log in with Spotify</span>
      </button>
    </div>
  );
}

export default LoginButton;
