/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { faqCards } from "@/constant";

type FaqCardProps = {
  title: string;
  icon?: string;
  emoji?: string;
  gradient: string;
  link?: string;
};

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "Why Starix" },
    { question: "How is Starix different from traditional social media?" },
    { question: "Why does ownership of content and IP matter?" },
    { question: "How do creators benefit from using Starix?" },
  ];

  const FaqCard = ({
    title,
    icon,
    emoji,
    gradient,
    link = "#",
  }: FaqCardProps) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 15 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="bg-white rounded-lg border-[0.3px] border-gray-200 py-4 min-w-xs w-fit hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <div
              className={`w-24 h-24 ${gradient} rounded-full flex items-center justify-center`}
            >
              {icon ? (
                <Image src={icon} width={100} height={100} alt={title} />
              ) : (
                <div className="text-4xl">{emoji}</div>
              )}
            </div>
          </div>
          <h3 className="text-xl font-mono text-gray-800 text-center mb-3">
            {title}
          </h3>
          <a
            href={link}
            className="flex items-center justify-center text-[#0A66C2] hover:text-blue-700 font-medium"
          >
            Learn more
            <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
          </a>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col gap-5"
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
          <h1 className="text-4xl font-bold text-[#333333] mb-2">
            Support Center
          </h1>
          <p className="text-[#333333] mb-4">How can we help you?</p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mx-auto px-4 pb-16 text-center -mt-12"
      >
        <div className="  w-full">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Help center"
              className="w-full pl-12 pr-4 py-3 rounded border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-center gap-6 mx-auto mb-7 flex-wrap justify-center"
      >
        {faqCards.map((card, i) => (
          <FaqCard key={i} {...card} />
        ))}
      </motion.div>

      {/* FAQ Section */}
      <div className="w-full max-w-5xl  mx-auto px-4 pb-16">
        <h2 className="text-xl text-[#333] font-mono my-8">FAQ</h2>

        <div className="space-y-4 mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg px-2 md:px-5 py-2 border border-dotted border-[#66666680] overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-3 md:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors "
              >
                <span className="text-lg font-medium text-gray-800 text-left">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{
                    duration: 0.25,
                    type: "spring",
                    stiffness: 250,
                  }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    key={index}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="px-6 py-4 bg-gray-50 border-t border-gray-200 overflow-hidden"
                  >
                    <p className="text-gray-600">
                      Content for `{faq.question}` would appear here. This
                      section can contain detailed explanations, instructions,
                      or relevant information.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
