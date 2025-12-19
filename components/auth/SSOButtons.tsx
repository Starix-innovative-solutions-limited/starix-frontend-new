
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SSOButtons = ({ onGoogleSign }: { onGoogleSign: () => void }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* <h4>r</h4> */}
        <button
          onClick={onGoogleSign}
          className="flex-center  max-md:text-xs text-sm  md:leading-9 gap-4 border-[0.6px] border-dark/40 bg-white max-md:px-3 px-6 !py-4  btn rounded-xl"
        >
          <FcGoogle size={20} />

          <span className="text-base font-light text-[#1a1a1a]">
          Continue with google
          </span>

        </button>
        
      <div className="flex-center gap-2 my-8 text-sm text-[#999999]">
        <div className="h-px w-6 grow bg-gray-300" />
        <span>or</span> 
        <div className="h-px w-6 grow bg-gray-300" />
      </div>
    </div>
  );
};

export default SSOButtons;