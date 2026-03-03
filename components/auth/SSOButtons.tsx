import React from "react";
import { FcGoogle } from "react-icons/fc";

const SSOButtons = ({ onGoogleSign }: { onGoogleSign: () => void }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={onGoogleSign}
        className="w-full flex items-center justify-center gap-4 border-[0.6px] border-dark/40 bg-white max-md:px-3 px-6 py-4 rounded-3xl"
      >
        <FcGoogle size={20} />

        <span className="text-base font-light text-[#1a1a1a]">
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default SSOButtons;