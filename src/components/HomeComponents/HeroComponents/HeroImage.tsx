

export default function HeroImage() {
  return (
    <div className='flex flex-col h-full items-center animate-dropInTop [&_img]:max-w-[100%] [&_img]:h-auto'>
        <img className="rotate-6 translate-y-5 shadow-2xl" src="/static/images/setlistfm-demo.png" alt="Setlist.fm demo image"></img>
        <img className="-rotate-3 shadow-xl" src="/static/images/spotify-demo.png" alt="Spotify demo image"></img>
    </div>
  )
}
