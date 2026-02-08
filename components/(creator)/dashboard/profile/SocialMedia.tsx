import { motion } from "framer-motion";
import { UserRoundSearch } from "lucide-react";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { LuLink2, LuLink2Off } from "react-icons/lu";
import { useModal } from "@/hooks/useModal";
import SocialMediaConnect from "./SocialMediaConnect";

import { useSocials } from "@/hooks/useSocials";

const SocialMedia = () => {
    const socials = [
        { icon: FaXTwitter, color: 'text-black', name: 'X', connected: true },
        { icon: FaYoutube, color: 'text-red-600', name: 'YouTube', connected: true },
        { icon: FaTiktok, color: 'text-black', name: 'TikTok', connected: true },
        { icon: FaInstagram, color: 'text-pink-600', name: 'Instagram', connected: false },
    ];
    const { open } = useModal()

    const { data: socialStatus } = useSocials()

    console.log("socials", socialStatus)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className=" p-6"
        >
            <div className=" mx-4 text-center flex items-center gap-2 justify-center pb-3 mb-5 border-b border-neut/20">
                <UserRoundSearch className="text-neut/60" size={23} />
                <span className="font-light text-neut/60 text-base">
                    Social Media
                </span>
            </div>

            <div className="space-y-3 mb-6">
                {socials.map((social, idx) => (
                    <div key={idx} className="flex items-center justify-between ">
                        <social.icon size={24} className={social?.color} />
                        <div className={`${social.connected ? 'bg-[#f5f5f5]' : 'bg-[#fafafa]'} flex items-center gap-1.5 text-sm  rounded-full px-2 py-1.5`}>
                            {/* <FiLink size={14} className={`font-light text-base ${social.connected ? 'text-blue-500' : 'text-neut'} `} /> */}
                            {
                                social?.connected ? <LuLink2 size={14} className="text-dark-navy" /> : <LuLink2Off size={14} className="text-neut" />
                            }


                            <span className={social.connected ? 'text-dark-navy/80 text-base' : 'text-neut/70 text-base'}>
                                {social.connected ? 'Connected' : 'Not connected'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => open(<SocialMediaConnect />)}
                className="w-fit ml-auto mt-6 flex items-center justify-center gap-2 px-4 py-2 border border-dark-navy/50 bg-white rounded-full text-sm text-dark-navy/70 hover:bg-gray-50 transition font-light">
                <FiEdit2 size={14} />
                <span className="text-sm">Edit Details</span>
            </button>
        </motion.div>
    );
};


export default SocialMedia