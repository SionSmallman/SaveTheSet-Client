import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

export default function SetlistURLForm() {
  const [setlistURL, setSetlistURL] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isUrlValid = checkIsUrlValid(setlistURL);
    if (isUrlValid) {
      const sid = getSetlistIdFromUrl(setlistURL);
      navigate(`/s/${sid}`);
    }
  };

  // helper function to extract setlist ID from URL input
  const getSetlistIdFromUrl = (url: string) => {
    const urlObj = new URL(url);
    const setlistPath = urlObj.pathname.split("/").at(-1);
    const setlistID = setlistPath?.split(".")[0].split("-").at(-1);
    return setlistID;
  };

  //check if URL is valid
  const checkIsUrlValid = (url: string) => {
    //check if empty
    if (url == "") {
      setError("Please enter a URL");
      return false;
    }
    try {
      const urlObj = new URL(url);

      if (urlObj.hostname != "www.setlist.fm") {
        setError("Entered URL should be from setlist.fm");
        return false;
      }
      return true;
    } catch (e) {
      setError("Please enter a valid URL");
      return false;
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[80vw] py-6 text-center text-white md:w-full">
        <form className="" onSubmit={handleSubmit}>
          <label htmlFor="setlist-form-url">
            <h3 className="mb-2 font-semibold text-2xl">
              Enter your Setlist.fm URL:
            </h3>
          </label>
          <div className="relative">
            <input
              id="setlist-form-url"
              type="text"
              placeholder="Paste your setlist.fm URL here"
              className={`text-black  h-12 w-full rounded pl-2 pr-9 md:text-base focus:outline-none focus:shadow-outline ${
                error && "outline outline-1 outline-red-600 focus:outline"
              }`}
              value={setlistURL}
              onChange={(e) => setSetlistURL(e.target.value)}
            />
            <FaArrowRight
              id="setlist-form-search"
              className="absolute right-[4px] top-[9px] cursor-pointer ml-2 border-l"
              size={30}
              color={"grey"}
              onClick={handleSubmit}
              role="button"
            />
          </div>
        </form>
        {error && (
          <div className="mt-2 text-base text-red-600 underline">
            <span>
              <MdErrorOutline
                className="inline fill-red-600"
                size={22}
              />
              {error}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
