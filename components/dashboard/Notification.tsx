/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for the notifications
const notificationList = [
    {
        id: 1,
        isRead: false,
        user: "Tiktok Brand",
        message: "Tiktok Brand has posted a new challenge!",
        time: "Now",
        avatarUrl: "https://placehold.co/40x40/2563eb/ffffff?text=User",
    },
    {
        id: 2,
        isRead: true,
        user: "Tiktok Brand",
        message: "Tiktok Brand has posted a new challenge!",
        time: "Last Week",
        avatarUrl: "https://placehold.co/40x40/2563eb/ffffff?text=User",
    },
    {
        id: 3,
        isRead: false,
        user: "Creative Agency",
        message: "Your campaign 'Summer Sale' has been approved.",
        time: "2 hours ago",
        avatarUrl: "https://placehold.co/40x40/f87171/ffffff?text=CA",
    },
    {
        id: 4,
        isRead: true,
        user: "Support Team",
        message: "Your ticket #987 has been resolved.",
        time: "Yesterday",
        avatarUrl: "https://placehold.co/40x40/4ade80/ffffff?text=ST",
    },
];

// --- Sub Component: Individual Notification Card ---
const NotificationCard = ({ notification, onMarkRead }: {
    notification: any, onMarkRead: any
}) => {
    const { id, isRead, user, message, time, avatarUrl } = notification;

    // Framer Motion variants for the card (initial, animate, whileHover)
    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -100, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout // Allows Framer Motion to animate layout changes when other items are removed
            className={`flex items-start p-4 cursor-pointer transition-colors duration-200 border-b border-gray-100 ${isRead ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/50 hover:bg-blue-100/70'
                }`}
            whileHover={{ scale: 1.005, backgroundColor: isRead ? '#f9fafb' : '#eff6ff' }}
            onClick={() => !isRead && onMarkRead(id)}
        >
            {/* Unread Indicator */}
            <div className="flex flex-col items-center mr-4 pt-2">
                {!isRead && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-blue-600 shadow-lg shadow-blue-400"
                    />
                )}
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0 mr-3">
                <img
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={avatarUrl}
                    alt={`${user} avatar`}
                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/9ca3af/ffffff?text=?" }}
                />
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
                <p className={`text-sm font-semibold truncate ${isRead ? 'text-gray-900' : 'text-blue-800'}`}>
                    {user}
                </p>
                <p className={`text-sm mt-0.5 ${isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                    {message}
                </p>
            </div>

            {/* Timestamp */}
            <div className="flex-shrink-0 ml-4 text-xs text-gray-400 self-end">
                {time}
            </div>
        </motion.div>
    );
};

const Notification = () => {

    const [notifications, setNotifications] = useState<any>(notificationList)

    const handleMarkRead = useCallback((id: any) => {
        setNotifications((prev: any) =>
            prev.map((n: any) => (n.id === id ? { ...n, isRead: true } : n))
        );
    }, []);
    return (
        <div className='z-[99999] bg-white border border-gray-200 rounded-2xl pt-3 pb-2 min-w-screen md:min-w-xl '>
            <div className='relative grid place-items-center py-3 mx-5 border-b border-b-dark/40'>
                <span className='text-center text-xl text-secondary-100'>Notification</span>


            </div>
            {/* Notification List */}
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100  overflow-x-hidden py-4 ">
                {notifications.length > 0 ? (
                    // AnimatePresence for individual item removal/addition
                    <AnimatePresence initial={false}>
                        {notifications.map((item: any) => (
                            <NotificationCard
                                key={item.id}
                                notification={item}
                                onMarkRead={handleMarkRead}
                            />
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        You are all caught up!
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification