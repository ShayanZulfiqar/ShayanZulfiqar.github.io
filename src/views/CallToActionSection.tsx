"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, Sparkles, Zap } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts, fetchClientStats } from "@/store/slices/landingSlice";

const CallToActionSection = () => {
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const { data: statsData } = useAppSelector((state) => state.landing.clientStats);
  const { mode } = useAppSelector((state) => state.theme);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchAboutContacts());
    dispatch(fetchClientStats());
  }, [dispatch]);

  const stats = [
    { value: statsData[1]?.value || "500+", label: statsData[1]?.label || "Projects Delivered" },
    { value: statsData[0]?.value || "300+", label: statsData[0]?.label || "Happy Clients" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-gray-900"}`}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F11C2] rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B31FF] rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#00E5FF] rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Enhanced Grid Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
            <span className="text-white text-sm font-medium relative z-10">
              Let&apos;s Create Something Amazing
            </span>
            <Zap className="w-4 h-4 text-[#00E5FF]" />
          </motion.div>

          {/* Main Heading with gradient animation */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <motion.span
              className="bg-gradient-to-r from-white via-[#00E5FF] to-white bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              {firstAbout?.mainTitle || "Let's Build Something Incredible Together"}
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {firstAbout?.subtitle || "Ready to transform your ideas into reality? Our team of experts is here to help you succeed. Let's start your journey to digital excellence today."}
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full font-semibold text-lg shadow-2xl flex items-center gap-2 relative overflow-hidden"
            >
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8B31FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{
                  scale: [1, 1.2, 1.2, 1],
                  opacity: [0.5, 0, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <span className="relative z-10">{firstAbout?.ctaButtons[0]?.label || "Start Your Project"}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold text-lg flex items-center gap-2 hover:border-white/50 transition-all font-sans relative overflow-hidden"
            >
              {/* Shimmer on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
              <Send className="w-5 h-5 group-hover:rotate-45 transition-transform relative z-10" />
              <span className="relative z-10">{firstAbout?.ctaButtons[1]?.label || "Contact Us"}</span>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats with animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group relative"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#4F11C2]/30 to-[#8B31FF]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative">
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{
                      background: "linear-gradient(135deg, #ffffff 0%, #4F11C2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    whileHover={{
                      scale: 1.1,
                    }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B31FF] to-transparent opacity-50" />
    </section>
  );
};

export default CallToActionSection;
