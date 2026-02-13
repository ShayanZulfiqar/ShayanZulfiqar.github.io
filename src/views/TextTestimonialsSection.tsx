"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Verified } from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTestimonials } from "@/store/slices/landingSlice";
import { imageUrl } from "../services/BaseUrl";

// Gradient colors for avatar fallback
const avatarGradients = [
  "from-[#4F11C2] to-[#8B31FF]",
  "from-[#8B31FF] to-[#00E5FF]",
  "from-[#2B00A4] to-[#4F11C2]",
  "from-[#00E5FF] to-[#2B00A4]",
  "from-[#4F11C2] to-[#00E5FF]",
  "from-[#8B31FF] to-[#2B00A4]",
  "from-[#0B0F19] to-[#4F11C2]",
  "from-[#4F11C2] to-[#8B31FF]",
];

const TextTestimonialsSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: testimonials, loading } = useAppSelector((state) => state.landing.testimonials);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const getFullUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${imageUrl}/${cleanPath}`;
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  const displayedTestimonials = testimonials.slice(0, displayCount);
  const hasMore = displayCount < testimonials.length;

  if (loading) {
    return (
      <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader />
            <p className={`animate-pulse ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>Loading engineering success stories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#4F11C2]/10" : "bg-[#4F11C2]/5"}`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#00E5FF]/10" : "bg-[#00E5FF]/5"}`} />

        {/* Grid Pattern (Same as home page) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.05]" : "opacity-[0.03]"}`}
          style={{
            backgroundImage: mode === "dark"
              ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
              : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 transition-all duration-300 ${mode === "dark"
              ? "border-[#4F11C2]/30 bg-[#4F11C2]/10 backdrop-blur-md"
              : "border-[#4F11C2]/20 bg-white/50 shadow-sm"}`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-[#4F11C2]"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-[#4F11C2]"}`}></span>
            </span>
            <span className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
              Global Testimonials
            </span>
          </motion.div>

          <h2 className={`mb-6 font-black text-4xl md:text-5xl lg:text-7xl tracking-tight transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
            Partnering in <br />
            <span className="bg-clip-text bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-transparent">
              Digital Excellence
            </span>
          </h2>
          <p className={`mx-auto max-w-2xl text-lg md:text-xl transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Unfiltered insights from leaders who have witnessed the impact of our high-performance engineering.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedTestimonials.map((testimonial, index) => {
            const gradientColor = avatarGradients[index % avatarGradients.length];

            return (
              <motion.div
                key={testimonial._id || testimonial.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <div className={`relative flex flex-col backdrop-blur-md rounded-[2rem] p-8 border h-full overflow-hidden transition-all duration-500 ${mode === "dark"
                  ? "bg-white/5 border-white/10 hover:border-[#00E5FF]/30 hover:bg-white/[0.08]"
                  : "bg-white/80 border-purple-100 shadow-[0_10px_40px_rgba(79,17,194,0.03)] hover:border-[#4F11C2]/30 hover:bg-white"}`}>

                  {/* Quote Icon */}
                  <div className={`top-8 right-8 absolute opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
                    <Quote className="w-16 h-16" />
                  </div>

                  {/* Rating */}
                  <div className="z-10 relative flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Star className="fill-yellow-400 w-4 h-4 text-yellow-400 drop-shadow-sm" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <div className="relative z-10 flex-1">
                    <p className={`mb-8 italic leading-relaxed text-lg transition-colors duration-500 ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>

                  {/* Project & Result Badge */}
                  {(testimonial.project || testimonial.result) && (
                    <div className={`z-10 relative mb-8 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${mode === "dark"
                      ? "bg-[#4F11C2]/5 border-white/5"
                      : "bg-purple-50/50 border-purple-100"}`}>
                      <div className="flex justify-between items-center text-xs">
                        {testimonial.project && (
                          <div className="flex-1">
                            <p className={`font-bold uppercase tracking-widest transition-colors duration-500 ${mode === "dark" ? "text-gray-500" : "text-gray-400"}`}>Initiative</p>
                            <p className={`font-bold transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
                              {testimonial.project}
                            </p>
                          </div>
                        )}
                        {testimonial.result && (
                          <div className="text-right flex-1">
                            <p className={`font-bold uppercase tracking-widest transition-colors duration-500 ${mode === "dark" ? "text-gray-500" : "text-gray-400"}`}>Impact</p>
                            <p className="font-bold text-green-500">
                              {testimonial.result}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Author */}
                  <div className="z-10 relative flex items-center gap-4 pt-6 mt-auto border-t transition-colors duration-500 border-inherit">
                    <div className="relative group/avatar">
                      <div className={`absolute -inset-1 rounded-full blur-md opacity-0 group-hover/avatar:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${gradientColor}`} />
                      {testimonial.imageUrl ? (
                        <div className={`w-14 h-14 rounded-full overflow-hidden shadow-xl flex-shrink-0 border-2 transition-colors duration-500 ${mode === "dark" ? "border-white/10" : "border-white"}`}>
                          <img
                            src={getFullUrl(testimonial.imageUrl)}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white text-xl font-black shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-500`}>
                          {testimonial.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                          {testimonial.name}
                        </h4>
                        <Verified className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className={`text-xs font-bold transition-colors duration-500 ${mode === "dark" ? "text-gray-500" : "text-gray-500"}`}>{testimonial.role}</p>
                      {testimonial.company && (
                        <p className={`font-black text-[10px] uppercase tracking-widest transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoadMore}
              className={`group relative overflow-hidden px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all duration-300 ${mode === "dark"
                ? "bg-white text-[#4F11C2] hover:bg-[#00E5FF] hover:text-black"
                : "bg-[#4F11C2] text-white hover:bg-[#8B31FF] shadow-purple-500/20"}`}
            >
              <span className="relative z-10 flex items-center gap-3">
                Architect More Stories
                <span className={`text-sm px-3 py-1 rounded-full ${mode === "dark" ? "bg-[#4F11C2] text-white" : "bg-white/20 text-white"}`}>
                  {testimonials.length - displayCount}
                </span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TextTestimonialsSection;
