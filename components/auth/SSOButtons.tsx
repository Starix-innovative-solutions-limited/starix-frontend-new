import Image from "next/image";
import React from "react";

const SSOButtons = ({ onGoogleSign }: { onGoogleSign: () => void }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* <h4>r</h4> */}
      <div className="flex items-center gap-1 md:gap-4">
        <button
          onClick={onGoogleSign}
          className="flex-center max-md:text-xs text-sm  md:leading-9 gap-2 border-[0.5px] border-[#99999966] bg-white max-md:px-3 px-6 py-2 rounded-md"
        >
          Continue with google
          <Image
            src="/images/auth/google.png"
            alt="google"
            width={10}
            height={10}
            className=""
          />
        </button>
        <button className="flex-center max-md:text-xs text-sm md:leading-9 max-md:gap-1 gap-2 border-[0.5px] border-[#99999966] max-md:px-3 px-6 py-2 rounded-md">
          Continue with apple
          <Image
            src="/images/auth/apple.png"
            alt="apple"
            width={20}
            height={20}
            className="inline-block ml-2"
          />
        </button>
      </div>
      {/* <div className=" bg-gray-800 w-6" /> */}
      <div className="flex-center mt-4 text-sm text-[#999999]">
        <div className=" bg-gray-300 grow w-6 h-px" /> &nbsp; Or &nbsp;
        <div className="h-px w-6 grow bg-gray-300" />
      </div>
    </div>
  );
};

export default SSOButtons;
