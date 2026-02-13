"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0B0F19] transition-colors duration-500">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F11C2]/10 rounded-full blur-[100px] animate-pulse" />

            <div className="relative flex flex-col items-center">
                {/* Main Logo/Icon Pulse */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-[#4F11C2] to-[#8B31FF] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,17,194,0.4)] mb-8"
                >
                    <span className="text-3xl font-bold text-white">H</span>
                </motion.div>

                {/* Loading Bar Container */}
                <div className="w-48 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
                    />
                </div>

                {/* Loading Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-sm font-medium tracking-widest uppercase bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent"
                >
                    Transforming Digital Worlds
                </motion.p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#4F11C2]/10 rounded-tl-3xl m-8" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#00E5FF]/10 rounded-br-3xl m-8" />
        </div>
    );
}
