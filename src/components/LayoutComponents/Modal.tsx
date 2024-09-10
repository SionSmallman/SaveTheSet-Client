// Reusable modal component.
// This component gives the background dim and modal content skeleton.
// Since modal action and button styles can change so drastically depending on use case, they aren't included
// The children prop should include the body text along with any action buttons

// For an example of how this is implemented, see "./SettingsComponents/DataDeleteModal.tsx"

import { ReactNode } from 'react'

interface ModalProps {
    shouldShow: boolean,           // State boolean that controls whether modal is shown
    onRequestClose: () => void;    // Close function
    title: string;                 // Modal Title
    children: ReactNode;           // Modal content

}

export const Modal = ({ shouldShow, onRequestClose, title, children }: ModalProps) => {
  return shouldShow ? (
    <>
          <div className="fixed inset-0 z-50 m-auto flex max-w-[85vw] items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/* Modal */}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/* Modal header */}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-2xl font-semibold">
                    {title}
                  </h3>
                  {/* Top right close button */}
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black  outline-none focus:outline-none"
                    onClick={onRequestClose}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="relative flex-auto p-4">
                    {children}
                </div>
              </div>
            </div>
          </div>
          {/* Background */}
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
  ) : null;
}
