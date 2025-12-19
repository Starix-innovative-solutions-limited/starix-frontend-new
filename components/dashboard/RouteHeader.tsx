import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type HeaderProps = {
    label: string;
    className?: string;
}

const RouteHeader = ({ label, className = "" }: HeaderProps) => {
    const router = useRouter()
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 mb-8 ${className}`}
        >
            <button className="p-2 hover:bg-white/50 rounded-full transition-colors" onClick={() => router.back()}>
                <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-normal text-dark-navy">{label}</h1>
        </motion.div>
    )
}

export default RouteHeader