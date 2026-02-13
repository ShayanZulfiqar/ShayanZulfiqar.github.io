"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOurJourneys } from "@/store/slices/landingSlice";

const CompanyStorySection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: ourJourneys, loading } = useAppSelector((state) => state.landing.ourJourneys);

  const journeyData = ourJourneys && ourJourneys.length > 0 ? ourJourneys[0] : null;

  useEffect(() => {
    dispatch(fetchOurJourneys());
  }, [dispatch]);

  if (loading) {
    return (
      <section className={`py-24 flex items-center justify-center min-h-[600px] transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-gradient-to-b from-white to-gray-50"
        }`}>
        <div className="text-center">
          <Loader />
          <p className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>Loading our journey...</p>
        </div>
      </section>
    );
  }

  if (!journeyData) return null;

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-gradient-to-b from-white to-gray-50"
      }`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "dark" ? (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F11C2]/20 rounded-full filter blur-[120px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00E5FF]/20 rounded-full filter blur-[120px] opacity-20" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F11C2]/10 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-3xl opacity-30" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`inline-block font-semibold text-sm uppercase tracking-wider mb-3 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"
              }`}
          >
            {journeyData.sectionTitle}
          </motion.span>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
            }`}>
            The{" "}
            <span className={`bg-gradient-to-r ${journeyData.mainTitleGradient} bg-clip-text text-transparent`}>
              {journeyData.mainTitle}
            </span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
            {journeyData.subtitle}
          </p>
        </motion.div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left - Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={`prose prose-lg max-w-none transition-colors duration-500 ${mode === "dark" ? "prose-invert" : ""
              }`}>
              {journeyData.storyParagraphs.map((paragraph, index) => (
                <p key={index} className={`leading-relaxed mb-6 transition-colors duration-500 ${mode === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quote Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`mt-8 p-6 rounded-2xl border-l-4 transition-all duration-500 ${mode === "dark"
                  ? "bg-white/5 border-white/20"
                  : `bg-gradient-to-r ${journeyData.quoteBox.quoteGradient}`
                } border-${journeyData.quoteBox.quoteBorderColor}`}
            >
              <p className={`italic text-lg mb-3 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-800"
                }`}>
                &quot;{journeyData.quoteBox.quoteText}&quot;
              </p>
              <p className={`font-semibold transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : `text-${journeyData.quoteBox.quoteBorderColor}`
                }`}>
                — {journeyData.quoteBox.quoteAuthor}, {journeyData.quoteBox.quoteDesignation}
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#4F11C2] via-[#8B31FF] to-[#00E5FF] flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 mx-auto mb-6 border-8 border-white/30 rounded-full flex items-center justify-center"
                  >
                    {(() => {
                      // @ts-ignore
                      const Icon = LucideIcons[journeyData.visualSection.visualIcon] || LucideIcons.Rocket;
                      return <Icon className="w-16 h-16" />;
                    })()}
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2">{journeyData.visualSection.visualYears}</h3>
                  <p className="text-lg">{journeyData.visualSection.visualSubtitle}</p>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            {journeyData.visualSection.floatingStats.map((stat, index) => {
              // @ts-ignore
              const StatIcon = LucideIcons[stat.icon] || LucideIcons.Trophy;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  animate={{ y: [0, -10, 0] }}
                  // @ts-ignore
                  transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                  className={`absolute ${index === 0 ? '-bottom-6 -left-6' : '-top-6 -right-6'} rounded-xl shadow-xl p-4 border transition-all duration-500 ${mode === "dark"
                      ? "bg-[#1A1F2E] border-white/10"
                      : "bg-white border-gray-100"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-${stat.iconBg} flex items-center justify-center`}>
                      <StatIcon className={`w-6 h-6 text-${stat.iconColor}`} />
                    </div>
                    <div>
                      <p className={`font-bold transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{stat.title}</p>
                      <p className={`text-sm transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`hidden lg:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 transition-colors duration-700 ${mode === "dark" ? "bg-gradient-to-r from-white/10 via-[#00E5FF]/20 to-white/10" : "bg-gradient-to-r from-[#4F11C2]/20 via-[#8B31FF]/20 to-[#4F11C2]/20"
            }`} />

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(journeyData.milestones.length, 4)} gap-8`}>
            {journeyData.milestones.map((milestone, index) => {
              // @ts-ignore
              const Icon = LucideIcons[milestone.icon] || LucideIcons.Lightbulb;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative group"
                >
                  <div className="text-center">
                    {/* Year Badge */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="inline-block px-4 py-2 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full font-bold text-lg mb-4 shadow-lg"
                    >
                      {milestone.year}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="relative mx-auto mb-6"
                    >
                      <div
                        className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${milestone.colorGradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${mode === "dark" ? "text-white group-hover:text-[#00E5FF]" : "text-gray-900"
                      }`}>
                      {milestone.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStorySection;
