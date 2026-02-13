"use client";

import { motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { FaStar } from "react-icons/fa";

const FeedbackModal = () => {
  const { close } = useModal();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="
        relative
        w-full
        max-w-[700px]
        mx-auto
        bg-white
        rounded-3xl
        px-6 sm:px-10
        py-10 sm:py-14
        shadow-[0px_20px_60px_rgba(0,0,0,0.12)]
      "
    >
      

      {/* CONTENT */}
      <div className="flex flex-col gap-8">
        {/* TITLE */}
        <h2 className="text-center text-2xl sm:text-3xl font-medium text-dark-navy">
          Starix Feedback
        </h2>

        {/* QUESTION */}
        <p className="text-xl sm:text-2xl text-dark-navy">
          How was the challenge process?
        </p>

        {/* STARS */}
        <div className="flex gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={36}
              className={`cursor-pointer transition ${
                star <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        {/* TEXT QUESTION */}
        <p className="text-xl sm:text-2xl text-dark-navy">
          What would you like to ask about?
        </p>

        {/* INPUT */}
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='“What improvements would help on”'
          className="
            w-full
            rounded-2xl
            border border-gray-300
            px-5 py-4
            text-base
            outline-none
            focus:ring-2 focus:ring-dark-navy/20
            resize-none
          "
        />

        {/* BUTTON */}
        <button
          className="
            mt-4
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
            console.log({ rating, message });
            close();
          }}
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default FeedbackModal;
