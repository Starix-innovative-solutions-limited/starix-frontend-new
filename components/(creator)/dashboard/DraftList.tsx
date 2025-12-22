/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface DraftListProps {
  onClose?: () => void;
}

const DraftList = ({ onClose }: DraftListProps) => {
  const [drafts, setDrafts] = useState([
    { id: 1, title: "Paulo pilly challenge", checked: false },
    { id: 2, title: "What winning means", checked: false },
  ]);

  const allChecked = drafts.every((d) => d.checked);
  const someChecked = drafts.some((d) => d.checked);

  // Toggle all
  const handleSelectAll = () => {
    const updated = drafts.map((d) => ({ ...d, checked: !allChecked }));
    setDrafts(updated);
  };

  // Toggle individual draft
  const handleToggle = (id: number) => {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d))
    );
  };

  // Deselect all
  const handleDeselectAll = () => {
    setDrafts((prev) => prev.map((d) => ({ ...d, checked: false })));
  };

  // Delete selected drafts
  const handleDelete = () => {
    setDrafts((prev) => prev.filter((d) => !d.checked));
  };

  return (
    <div className="relative w-full flex-1 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shadow">
        <div className="flex items-center w-full justify-between gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 accent-secondary-300 cursor-pointer"
            checked={allChecked}
            onChange={handleSelectAll}
          />
          <p className="font-medium text-[#333333] text-lg">All Drafts</p>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            &nbsp;
          </button>
        </div>
      </div>

      {/* Draft Items */}
      <div className="pt-3">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
          >
            <input
              type="checkbox"
              checked={draft.checked}
              onChange={() => handleToggle(draft.id)}
              className="w-4 h-4 accent-[#666] cursor-pointer"
            />
            <span className="text-sm text-gray-700">{draft.title}</span>
          </div>
        ))}
      </div>

      {/* Animated Bottom Action Bar */}
      <AnimatePresence>
        {someChecked && (
          <motion.div
            key="action-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="fixed bottom-0 py-2 left-0 w-full flex justify-between px-6 border-t border-[#DDD]"
          >
            <button
              onClick={handleDeselectAll}
              className="text-sm text-secondary-300/80 font-semibold hover:text-gray-800"
            >
              Deselect all
            </button>

            <button
              onClick={handleDelete}
              className="px-7 py-2 text-sm bg-hot-100 text-white rounded-md shadow hover:bg-red-600"
            >
              Delete.
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DraftList;
