"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTestimonials } from "@/store/slices/landingSlice";
import { imageUrl } from "@/services/BaseUrl";

const TestimonialsSection = () => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: testimonials, loading: isLoading } = useAppSelector((state) => state.landing.testimonials);
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getFullImageUrl = (image: string) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `${imageUrl}/${image.replace(/\\/g, '/')}`;
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  if (isLoading) {
    return (
      <div className={`py-24 flex items-center justify-center min-h-[600px] transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-gradient-to-b from-white to-[#4F11C2]/5"}`}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`w-12 h-12 border-4 border-t-transparent rounded-full ${mode === "dark" ? "border-[#00E5FF]" : "border-[#4F11C2]"}`}
        />
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-gradient-to-b from-white to-[#4F11C2]/5"}`}>
      {/* Enhanced Background Elements with animation */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#4F11C2]/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B31FF]/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`inline-block font-semibold text-sm uppercase tracking-wider mb-3 px-4 py-1.5 rounded-full transition-all duration-300 ${mode === "dark"
              ? "text-[#00E5FF] bg-[#4F11C2]/20 border border-[#4F11C2]/30"
              : "text-[#4F11C2] bg-[#4F11C2]/10"}`}
          >
            Testimonials
          </motion.span>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
            What Our{" "}
            <span className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Don&apos;t just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className={`rounded-3xl shadow-2xl p-8 md:p-12 border relative overflow-hidden hover:shadow-3xl transition-all duration-500 ${mode === "dark"
                ? "bg-black/40 border-white/10"
                : "bg-white border-gray-100"}`}>
                {/* Enhanced Quote Icon with glow */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  className={`absolute top-8 right-8 transition-colors duration-300 ${mode === "dark" ? "text-white/5" : "text-[#4F11C2]/10"}`}
                >
                  <Quote className="w-24 h-24" />
                  <motion.div
                    className="absolute inset-0 bg-[#4F11C2]/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  {/* Enhanced Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0 relative"
                  >
                    <div className={`w-32 h-32 rounded-full shadow-xl overflow-hidden border-4 flex items-center justify-center relative transition-colors duration-300 ${mode === "dark" ? "border-white/10 bg-white/5" : "border-white bg-[#4F11C2]/10"}`}>
                      {/* Animated ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-4 transition-colors duration-300 ${mode === "dark" ? "border-[#00E5FF]/20" : "border-[#4F11C2]/30"}`}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {current.image ? (
                        <img
                          src={getFullImageUrl(current.image) || ''}
                          alt={current.name}
                          className="w-full h-full object-cover relative z-10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(current.name)}&background=4F11C2&color=fff`;
                          }}
                        />
                      ) : (
                        <span className={`text-3xl font-bold relative z-10 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-[#4F11C2]"}`}>
                          {getInitials(current.name)}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Rating with staggered animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex justify-center md:justify-start gap-1 mb-4"
                    >
                      {[...Array(current.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.5 + i * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-md" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Text */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`text-xl leading-relaxed mb-6 italic transition-colors duration-300 ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      &quot;{current.text}&quot;
                    </motion.p>

                    {/* Name and Role */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h4 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                        {current.name}
                      </h4>
                      <p className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent font-medium">
                        {current.role} {current.company ? `at ${current.company}` : ''}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-4 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "w-8 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF]"
                    : (mode === "dark" ? "w-3 bg-white/20 hover:bg-[#8B31FF]" : "w-3 bg-gray-300 hover:bg-[#8B31FF]")
                    }`}
                />
              ))}
            </div>

            {/* Auto-play toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-4 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              title={isAutoPlaying ? "Pause" : "Play"}
            >
              {isAutoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-4 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Additional Testimonial Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial._id || testimonial.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group rounded-xl p-6 shadow-lg border hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${mode === "dark"
                ? "bg-black/30 border-white/5"
                : "bg-white border-gray-100"}`}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#4F11C2]/5 to-[#8B31FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`text-sm mb-4 line-clamp-3 transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full shadow-md overflow-hidden bg-[#4F11C2]/5 flex items-center justify-center">
                    {testimonial.image ? (
                      <img
                        src={getFullImageUrl(testimonial.image) || ''}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=4F11C2&color=fff`;
                        }}
                      />
                    ) : (
                      <span className={`text-xs font-bold transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-[#4F11C2]"}`}>
                        {getInitials(testimonial.name)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className={`font-semibold text-sm transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                      {testimonial.name}
                    </h5>
                    <p className={`text-xs transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section >
  );
};

export default TestimonialsSection;
