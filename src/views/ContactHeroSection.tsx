"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { MessageCircle } from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchContactHeroes } from "@/store/slices/landingSlice";

const ContactHeroSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: contactHeroData, loading } = useAppSelector((state) => state.landing.contactHero);

  const heroData = contactHeroData && contactHeroData.length > 0 ? contactHeroData[0] : null;

  useEffect(() => {
    dispatch(fetchContactHeroes());
  }, [dispatch]);

  if (loading) {
    return (
      <section className={`relative flex justify-center items-center pt-20 pb-10 min-h-[70vh] transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"
        }`}>
        <div className="text-center">
          <Loader />
          <p className={mode === "dark" ? "text-purple-200" : "text-gray-600"}>Loading...</p>
        </div>
      </section>
    );
  }

  // Use default values if no data
  const badgeText = heroData?.badgeText || "We're Here to Help";
  const mainTitle = heroData?.mainTitle || "Let's Start a Conversation";
  const subtitle = heroData?.subtitle || "Have a project in mind? Questions about our services? We'd love to hear from you. Our team is ready to help transform your ideas into reality.";
  const contacts = heroData?.contacts || [];

  return (
    <section className={`relative flex justify-center items-center pt-20 pb-10 min-h-[70vh] overflow-hidden transition-colors duration-700 ${mode === "dark"
        ? "bg-[#0B0F19]"
        : "bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50"
      }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "dark" ? (
          <>
            <motion.div
              className="top-20 left-10 absolute bg-[#4F11C2] opacity-20 blur-[120px] rounded-full w-72 h-72 mix-blend-screen filter"
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
              className="right-10 bottom-20 absolute bg-[#8B31FF] opacity-20 blur-[120px] rounded-full w-96 h-96 mix-blend-screen filter"
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
          </>
        ) : (
          <>
            <motion.div
              className="top-20 left-10 absolute bg-[#4F11C2]/10 blur-[100px] rounded-full w-72 h-72 filter"
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
              className="right-10 bottom-20 absolute bg-[#00E5FF]/10 blur-[100px] rounded-full w-96 h-96 filter"
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
          </>
        )}
      </div>

      {/* Grid Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.05]" : "opacity-[0.03]"}`}
        style={{
          backgroundImage: mode === "dark"
            ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
            : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl text-center">
        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block relative mb-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`flex justify-center items-center bg-gradient-to-br from-[#4F11C2] via-[#8B31FF] to-[#00E5FF] shadow-2xl rounded-2xl w-24 h-24 backdrop-blur-md transition-all duration-500`}
          >
            <MessageCircle className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br from-[#4F11C2] to-[#00E5FF] blur-2xl rounded-2xl transition-all duration-500 ${mode === "dark" ? "opacity-50" : "opacity-30"
              }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: mode === "dark" ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
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
          className={`inline-flex items-center gap-2 backdrop-blur-sm mb-8 px-6 py-2 border rounded-full transition-all duration-500 ${mode === "dark"
              ? "bg-white/10 border-white/20"
              : "bg-white/80 border-purple-100"
            }`}
        >
          <span className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
          <span className={`font-medium text-sm transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-[#4F11C2]"}`}>
            {badgeText}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mb-6 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
            }`}
        >
          {mainTitle.split(' ').slice(0, -1).join(' ')}
          <br />
          <span className="bg-clip-text bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF] text-transparent">
            {mainTitle.split(' ').slice(-1)[0]}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`mx-auto mb-12 max-w-3xl text-lg sm:text-xl md:text-2xl leading-relaxed transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
        >
          {subtitle}
        </motion.p>

        {/* Quick Contact Cards */}
        {contacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className={`gap-6 grid grid-cols-1 sm:grid-cols-${Math.min(contacts.length, 3)} mx-auto max-w-4xl`}
          >
            {contacts.map((item, index) => {
              // @ts-ignore
              const Icon = LucideIcons[item.icon] || LucideIcons.Mail;

              // Extract gradient class or use default
              const gradientClass = item.color.includes('from-')
                ? item.color
                : "from-[#4F11C2] to-[#8B31FF]";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`group backdrop-blur-md p-6 border rounded-2xl text-center cursor-pointer transition-all duration-500 ${mode === "dark"
                      ? "bg-white/10 border-white/20 hover:border-[#00E5FF]/50"
                      : "bg-white border-gray-100 hover:border-[#4F11C2]/30 shadow-sm"
                    }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradientClass} mb-4 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className={`mb-2 font-semibold text-sm transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-[#4F11C2]"
                    }`}>
                    {item.title}
                  </h3>
                  <p className={`font-medium transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{item.value}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity },
          }}
          className="bottom-2 left-1/2 absolute -translate-x-1/2 transform"
        >
          <div className={`flex justify-center border-2 rounded-full w-6 h-10 transition-colors duration-500 ${mode === "dark" ? "border-white/30" : "border-[#4F11C2]/30"
            }`}>
            <div className={`mt-2 rounded-full w-1.5 h-3 transition-colors duration-500 ${mode === "dark" ? "bg-white" : "bg-[#4F11C2]"
              }`} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
