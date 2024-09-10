import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { Modal } from "../LayoutComponents/Modal";

interface DataDeleteModalProps {
  shouldShow: boolean;
  onRequestClose: () => void;
}

export function DataDeleteModal({ shouldShow, onRequestClose }: DataDeleteModalProps) {

  const { logout } = useLogout();
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const user = state.user;

  
  // Get user ID from context and send to API endpoint to request data deletion
  // If successful, logout and navigate to home page
  // If unsuccessful, display error
  const deleteCurrentUserData = async () => {
    const spotifyUserId = user!.userId;
    await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/user/${spotifyUserId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("stsToken"),
          "Content-Type": "application/json",
        },
      },
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Network error");
      }
      logout();
      navigate("/");
      
    }).catch((error) => {
        console.error("Fetch error: ", error);
      });
  };

  return (
    <Modal
      shouldShow={shouldShow}
      onRequestClose={onRequestClose}
      title="Delete Account Data"
    >
      {/* Main modal body */}
      <p className="leading-relaxed">
        Requesting the deletion of your data will remove the any stored data
        relating to the following:
        <ul className="m-2 list-disc pl-5">
          <li>Your Spotify User Id</li>
          <li>Any history of playlists created using Save the Set</li>
        </ul>
        It will also log you out of your account. <br />
        Any data required future use of Save the Set beyond this deletion will
        still be collected. To have this future data removed, then you should
        use the Data Deletion Request service again.
      </p>
      <div className="m-2 text-center">
        <span className="font-bold">
          Are you sure you want to proceed with the Data Deletion Request?
        </span>
      </div>
      {/* Button Drawer */}
      <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
        <button
          id="data-delete-modal-cancel"
          className="background-transparent m-1 px-6 py-2 text-sm font-bold uppercase text-black"
          type="button"
          onClick={onRequestClose}
        >
          Cancel
        </button>
        <button
          id="data-delete-modal-confirm"
          className="mb-1 mr-1 rounded bg-red-600 px-6 py-3 text-sm font-bold uppercase text-white shadow"
          type="button"
          onClick={deleteCurrentUserData}
        >
          Delete data
        </button>
      </div>
    </Modal>
  );
}
