/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { StarRating } from "@/components/dashboard";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col gap-7"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center w-full h-64 flex items-center justify-center rounded"
        style={{
          backgroundImage: "url('/images/support.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="text-4xl font-bold text-[#333333] mb-2">Feedback</h1>
          <p className="text-[#333333] mb-4">How can we make it better?</p>
        </div>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 my-7 flex-wrap max-w-5xl w-full mx-auto "
      >
        <h3 className="text-[#666] text-xl font-mono">
          Rate your experience with our product
        </h3>

        <StarRating initialRating={0} />

        <div className="pb-16 flex flex-col gap-6 mt-5">
          <h2 className="text-xl text-[#666] font-mono ">
            What would you like to be improved?
          </h2>

          <textarea
            rows={8}
            placeholder="Your feedback (optional)"
            className="input"
          />

          <button className="btn w-fit bg-secondary-300 py-2 text-white ml-auto ">
            Submit feedback
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
