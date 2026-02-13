"use client";

import { motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import { useModal } from "@/hooks/useModal";

const FundChallenge = () => {
  const { close } = useModal();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="
        relative
        w-full
        max-w-[640px]
        mx-auto
       
        px-6 sm:px-10
        py-10 sm:py-14
       
      "
    >
      

      {/* CONTENT */}
      <div className="flex flex-col items-center text-center gap-6">
        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl font-medium text-dark-navy">
          Fund Challenge
        </h2>

        {/* SUBTITLE */}
        <p className="text-xl sm:text-2xl font-medium text-dark-navy">
          Activate Challenge with Paystack
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm sm:text-base max-w-[420px] leading-relaxed">
          The funds will be securely held in escrow via Paystack and
          released when winners are selected
        </p>

        {/* CTA BUTTON */}
        <button
          className="
            mt-8
            w-full
            py-4
            rounded-full
            bg-dark-navy
            text-white
            text-lg
            font-medium
            hover:opacity-95
            transition
          "
          onClick={() => {
            // TODO: redirect to paystack
            console.log("Go to Paystack");
          }}
        >
          Go To Paystack
        </button>
      </div>
    </motion.div>
  );
};

export default FundChallenge;
