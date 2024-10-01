import { useState } from "react";
import { DataDeleteModal } from "./DataDeleteModal";

function AccountSettings() {
  const [showDataDeleteModal, setShowDataDeleteModal] = useState(false);

  return (
    <>
      <h1 className="text-center text-lg font-extrabold">Account Settings</h1>
      <div className="setting block">
        <h2 className="text-lg font-bold text-red-500">Delete Account Data</h2>
        <p className="text-sm">
          This will remove any data that associated with your Spotify account
          from our database.
        </p>
        <button
          id="data-delete-button"
          className="m-1 inline rounded bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none"
          type="button"
          onClick={() => setShowDataDeleteModal(true)}
        >
          Delete data
        </button>
        <DataDeleteModal shouldShow={showDataDeleteModal} onRequestClose={() => setShowDataDeleteModal(false)}/>
      </div>
    </>
  );
}

export default AccountSettings;
