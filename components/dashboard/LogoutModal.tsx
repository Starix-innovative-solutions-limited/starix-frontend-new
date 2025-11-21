/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoutProps {
  onClose?: () => void;
}

export default function LogoutModal({ onClose }: LogoutProps) {
  const router = useRouter();

  return (
    <div className=" flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl  p-8 max-w-md w-full"
      >
        <div className="relative mb-8">
          <div className="relative flex items-center justify-center gap-4">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative"
            >
              <Image
                src={"/images/logout.png"}
                alt="nkl"
                width={1000}
                height={1000}
                className="rounded-full w-64 h-fit flex items-center justify-center"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Are you sure you want to logout?
          </h2>
          <p className="text-gray-600 text-sm">
            You`ll be required to login again to access your account
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex-between gap-4 mt-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" px-3 py-1.5 bg-[#F8D3CA] text-[#DC2626] rounded-lg font-medium hover:bg-red-100 transition-colors"
            onClick={() => {
              router.push("/login");

              onClose?.();
            }}
          >
            Yes, Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" px-3 py-1.5 bg-secondary-300 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={() => onClose?.()}
          >
            cancel.
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
