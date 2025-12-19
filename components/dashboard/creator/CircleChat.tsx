import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAdd } from 'react-icons/io5';

export default function CircleChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 2, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 3, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 4, user: '@Favvy', text: "Okay that's fine", time: '12:00PM', isOwn: false },
    { id: 5, user: 'You', text: "Okay that's fine", time: '12:00PM', isOwn: true },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: 'You',
          text: inputValue,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          isOwn: true,
        },
      ]);
      setInputValue('');
    }
  };

  return (
      <div className="w-full bg-white/60 rounded-2xl overflow-hidden flex flex-col md:max-h-[70vh] ">


        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
          {/* Date Divider */}
          <div className="flex items-center justify-center py-2">
            <span className="text-xs text-gray-400">Sun 10:34PM</span>
          </div>

          <AnimatePresence>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {/* Join notification */}
                {index === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center py-3"
                  >
                    <span className="text-xs text-gray-400">Favvij joined the circle</span>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-3 mb-8  ${message.isOwn ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  {!message.isOwn && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Favvy"
                        alt="avatar"
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    {!message.isOwn && (
                      <span className="text-xs text-gray-500 mb-1 ml-1">{message.user}</span>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isOwn
                          ? 'bg-purple-500 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 mx-1">{message.time}</span>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message"
              className="flex-1 px-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-purple-600 transition-colors"
            >
              <IoAdd className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
  );
}