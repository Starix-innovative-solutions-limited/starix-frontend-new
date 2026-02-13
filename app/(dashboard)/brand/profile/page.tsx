"use client";

import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useAuthStore } from "@/store/useAuthStore";
import { FiEdit2 } from "react-icons/fi";
import EditProfileModal from "@/components/(brand)/profile/EditProfileModal";
import { useModal } from "@/hooks/useModal";


const Page = () => {
  const { profile, user } = useAuthStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const { open } = useModal();


  return (
    <div className="min-h-250 general-space">
      <motion.div
        variants={variants?.headerVariants}
        className="flex flex-col gap-8 mt-4 md:mt-10"
      >
        {/* PAGE TITLE */}
        <span className="text-2xl md:text-[28px] text-secondary-100">
          Profile
        </span>

        {/* CARD */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            bg-white
            rounded-2xl
            border border-gray-100
            shadow-sm
            px-5 py-6
            md:px-10 md:py-10
            w-full
          "
        >
          {/* HEADER ROW */}
          <motion.div
            variants={itemVariants}
            className="
              flex flex-col sm:flex-row
              sm:items-center
              sm:justify-between
              gap-6
              mb-10
            "
          >
            {/* AVATAR + NAME */}
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />

              <h2 className="text-xl md:text-2xl text-dark-navy">
                {profile?.brand_name || "Brand Name"}
              </h2>
            </div>

            {/* EDIT BUTTON */}
            <button
            onClick={() => open(<EditProfileModal />)}
              className="
                flex items-center gap-2
                px-5 py-2
                border border-gray-300
                rounded-full
                text-sm
                text-dark-navy
                hover:bg-gray-50
                transition
                w-fit
              "
            >
              <FiEdit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </motion.div>

          {/* INFO GRID */}
          <div className="space-y-8">
            {/* BIO */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-neut/60 mb-2">Brand Bio:</p>
              <p className="text-dark-navy leading-relaxed max-w-3xl">
                {profile?.description ||
                  "From brands running high-impact challenges to creators winning rewards and building"}
              </p>
            </motion.div>

            {/* EMAIL */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-neut/60 mb-1">Email:</p>
              <p className="text-dark-navy">
                {user?.email || "brand@mail.com"}
              </p>
            </motion.div>

            {/* PHONE */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-neut/60 mb-1">Phone No:</p>
              <p className="text-dark-navy">+234 0000 000 000</p>
            </motion.div>

            {/* WEBSITE */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-neut/60 mb-1">Website or URL:</p>
              <a
                href={`https://${profile?.website || "example.com"}`}
                target="_blank"
                className="text-dark-navy hover:underline"
              >
                {profile?.website || "example.com"}
              </a>
            </motion.div>

            {/* INDUSTRY */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-neut/60 mb-1">Industry:</p>
              <p className="text-dark-navy">
                {profile?.industry || "Industry"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
