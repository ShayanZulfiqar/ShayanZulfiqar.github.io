"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Globe, Sparkles } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts } from "@/store/slices/landingSlice";

const VisionHeroSection = () => {
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchAboutContacts());
  }, [dispatch]);

  return (
    <section className="relative flex justify-center items-center bg-gradient-to-br from-[#0B0F19] via-[#4F11C2] to-[#8B31FF] pt-20 min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="top-20 left-10 absolute bg-[#00E5FF] opacity-20 blur-xl rounded-full w-72 h-72 mix-blend-multiply filter"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="right-10 bottom-20 absolute bg-[#4F11C2] opacity-20 blur-xl rounded-full w-96 h-96 mix-blend-multiply filter"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="top-1/2 left-1/2 absolute bg-[#2B00A4] opacity-20 blur-xl rounded-full w-80 h-80 mix-blend-multiply filter"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Starfield effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full w-1 h-1"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl text-center">
        {/* Floating Eye Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block relative mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex justify-center items-center bg-gradient-to-br from-[#00E5FF] via-[#2B00A4] to-[#4F11C2] shadow-2xl rounded-full w-32 h-32"
          >
            <Rocket className="w-16 h-16 text-white" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#00E5FF] to-[#4F11C2] opacity-50 blur-2xl rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm mb-8 px-6 py-2 border border-white/20 rounded-full"
        >
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-medium text-white text-sm">
            Our Vision for the Future
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
        >
          {firstAbout?.mainTitle || "Shaping the Digital Tomorrow"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mb-12 max-w-4xl text-[#8B31FF]/80 text-lg sm:text-xl md:text-2xl leading-relaxed"
        >
          {firstAbout?.subtitle || "We envision a world where technology empowers every business to reach its full potential. Our commitment is to lead the digital revolution, creating innovative solutions that transform industries and improve lives globally."}
        </motion.p>

        {/* Key Vision Points */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="gap-6 grid grid-cols-1 sm:grid-cols-3 mx-auto mb-12 max-w-5xl"
        >
          {[
            {
              icon: Globe,
              title: "Global Impact",
              description: "Transforming businesses worldwide",
            },
            {
              icon: Rocket,
              title: "Innovation First",
              description: "Leading technological advancement",
            },
            {
              icon: Sparkles,
              title: "Sustainable Growth",
              description: "Building for the future",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 border border-white/20 rounded-2xl text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex bg-gradient-to-br from-[#00E5FF] to-[#4F11C2] shadow-lg mb-4 p-4 rounded-xl"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="mb-2 font-bold text-white text-xl">
                  {item.title}
                </h3>
                <p className="text-[#8B31FF] text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#00E5FF] to-[#4F11C2] shadow-2xl hover:shadow-[#4F11C2]/50 px-10 py-5 rounded-full font-bold text-white text-xl transition-all duration-300"
          >
            Explore Our Vision
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity },
          }}
          className="bottom-10 left-1/2 absolute -translate-x-1/2 transform"
        >
          <div className="flex justify-center border-2 border-white/30 rounded-full w-6 h-10">
            <div className="bg-white mt-2 rounded-full w-1.5 h-3" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionHeroSection;
