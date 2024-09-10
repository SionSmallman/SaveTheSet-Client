function Footer() {
  return (
    <footer className="inset-x-0 bottom-0 h-[60px] md:h-[100px] w-screen">
      <div className="flex h-full w-full items-center justify-center bg-[#273955] px-2 text-center text-[#efefef] text-sm md:text-base ">
        <p>
          <span className="font-bold">
            Made with 💜 by{" "}
            <a href="https://sionsmallman.com/" className="underline">
              Siôn Smallman
            </a>
          </span>{" "}
          | "Save the Set" is not affiliated with Spotify or setlist.fm
        </p>
      </div>
    </footer>
  );
}

export default Footer;
