import HeroImage from "./HeroComponents/HeroImage";
import HomeCopy from "./HeroComponents/HomeCopy";
import SetlistURLForm from "./SetlistURLForm";

export default function Hero() {
  return (
    <div className="bg-[#273955] animate-dropInTop">
      <div className="m-auto max-w-7xl flex flex-col items-center justify-center lg:flex-row">
        <div className="text-center p-10 lg:max-w-2xl lg:text-left ">
          <HomeCopy />
          <SetlistURLForm />
        </div>
        <div className="w-1/2 my-4 hidden lg:block">
          <HeroImage />
        </div>
      </div>
      <div className="relative">
        <svg
          viewBox="0 0 1440 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          className="absolute left-0 top-0 bg-transparent mb-14"
        >
          <path
            d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
            fill="#273955"
          ></path>
          <path d="M4,0.990777969 C4,0.443586406 4.44386482,0 5,0 C5.55228475,0 6,0.45097518 6,0.990777969 L6,5.00922203 C6,5.55641359 5.55613518,6 5,6 C4.44771525,6 4,5.54902482 4,5.00922203 L4,0.990777969 Z M10,8.99077797 C10,8.44358641 10.4438648,8 11,8 C11.5522847,8 12,8.45097518 12,8.99077797 L12,13.009222 C12,13.5564136 11.5561352,14 11,14 C10.4477153,14 10,13.5490248 10,13.009222 L10,8.99077797 Z" id="Combined-Shape"></path>
        </svg>
      </div>
    </div>
  );
}
