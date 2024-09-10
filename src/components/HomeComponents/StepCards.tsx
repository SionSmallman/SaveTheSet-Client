import { FaLink, FaHeadphones } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { useIsVisible } from "../../hooks/useIsVisible";

const StepCards = () => {
  const steps = [
    {
      title: "Enter your Setlist.fm Link",
      description: "Paste the Setlist.fm link into the form above to get started.",
      icon: <FaLink className="m-auto" />
    },
    {
      title: "Customise your playlist",
      description: "Customise your playlist details, choosing what songs you'd like to include.",
      icon: <FaEdit className="m-auto" />
    },
    {
      title: "Generate your Spotify Playlist",
      description: "Generate your personalised Spotify playlist and relive the show!",
      icon: <FaHeadphones className="m-auto" />
    }
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref)

  return (
    <div  className={`${isVisible ? "block animate-dropInTop" : "opacity-0"}`}>
      <h1 className="mb-10 font-extrabold text-4xl">Three easy steps!</h1>
      <div ref={ref} id="steps-container" className="flex flex-col justify-between m-auto space-y-6 md:flex-row md:max-w-screen-md md:space-y-0 md:space-x-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="animate-dropInTop bg-white border border-gray-200 rounded-lg shadow-md p-6 text-center w-[75vw] md:w-1/3"
          >
            <div className="h-1/2">
                <div className="text-2xl my-2 md:text-4xl">{step.icon}</div>
                <h3 className="font-semibold mb-3 md:text-xl ">{step.title}</h3>
            </div>
            <div className="h-1/2">
                <p className="text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default StepCards;