import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAdd } from 'react-icons/io5';
import { HiDocumentText, HiPhotograph, HiLink } from 'react-icons/hi';
import { BsFileEarmarkText } from 'react-icons/bs';
import ResourceLibrary from '../ResourceLibrabry';
import { useModal } from "@/hooks/useModal";


export default function CircleChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 2, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 3, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 4, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 5, user: 'You', text: "Okay that's fine", time: '12:00PM', isOwn: true },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const handleSend = (text?: string) => {
    const finalText = text || inputValue;
    if (!finalText.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: 'You',
        text: finalText,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isOwn: true,
      },
    ]);

    setInputValue('');
  };

  /* ---------------- ATTACH ACTIONS ---------------- */

  const openDocumentPicker = () => {
    fileInputRef.current?.click();
    setShowAttachMenu(false);
  };

  const { open } = useModal();

  const openResourceLibrary = () => {
  setShowAttachMenu(false); // close the small popup
  open(<ResourceLibrary />);
};


  const openMediaPicker = () => {
    mediaInputRef.current?.click();
    setShowAttachMenu(false);
  };

  const pasteLink = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleSend(text);
    } catch {
      alert("Clipboard permission denied");
    }
    setShowAttachMenu(false);
  };

  const openTemplate = () => {
    alert("Open Template Modal Here");
    setShowAttachMenu(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleSend(`📎 ${file.name}`);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleSend(`🖼️ ${file.name}`);
  };

  return (
    <div className="w-full bg-white/60 rounded-2xl overflow-hidden flex flex-col md:max-h-[70vh] relative">

      {/* Hidden Inputs */}
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
      <input ref={mediaInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaChange} />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
        <div className="flex items-center justify-center py-2">
          <span className="text-xs text-gray-400">Sun 10:34PM</span>
        </div>

        {messages.map((message, index) => (
          <div key={message.id} className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
            {!message.isOwn && (
              <img src="/avatar.svg" className="w-10 h-10 rounded-full" />
            )}

            <div className={`max-w-[70%] ${message.isOwn ? 'items-end' : ''}`}>
              <div className={`px-4 py-3 rounded-2xl ${message.isOwn ? 'bg-[#FFF8F5]' : 'bg-gray-100'}`}>
                {message.text}
              </div>
              <span className="text-xs text-gray-400">{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ATTACH POPUP */}
      <AnimatePresence>
  {showAttachMenu && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-24 right-6 bg-white shadow-sm rounded-2xl p-3 w-56"
    >
      <AttachButton
        icon={<HiDocumentText />}
        label="Document"
        onClick={openResourceLibrary}
      />

      <AttachButton
        icon={<HiPhotograph />}
        label="Photos & Videos"
        onClick={openResourceLibrary}
      />

      <AttachButton
        icon={<HiLink />}
        label="Paste Link"
        onClick={openResourceLibrary}
      />

      <AttachButton
        icon={<BsFileEarmarkText />}
        label="Template"
        onClick={openResourceLibrary}
      />
    </motion.div>
  )}
</AnimatePresence>


      {/* Input Area */}
      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <div className="flex items-center border border-gray-200 rounded-2xl gap-3">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message ..."
            className="flex-1 px-7 py-4 focus:outline-none"
          />

          <IoAdd
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="w-6 h-6 mx-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

/* -------- ATTACH BUTTON -------- */

function AttachButton({ icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-3 hover:bg-gray-50 rounded-xl"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}
