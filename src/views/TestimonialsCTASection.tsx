"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Star, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts, fetchClientStats } from "@/store/slices/landingSlice";

const TestimonialsCTASection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const { data: statsData } = useAppSelector((state) => state.landing.clientStats);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchAboutContacts());
    dispatch(fetchClientStats());
  }, [dispatch]);

  return (
    <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mode === "dark" ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4F11C2]/10 rounded-full filter blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B31FF]/10 rounded-full filter blur-[120px]"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4F11C2]/5 rounded-full filter blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full filter blur-[100px]"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -30, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-12 shadow-2xl backdrop-blur-md border transition-all duration-500 ${mode === "dark"
              ? "bg-white/5 border-white/10 text-[#00E5FF]"
              : "bg-white/80 border-purple-100 text-[#4F11C2]"}`}
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl md:text-6xl lg:text-8xl font-black mb-8 leading-tight transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {firstAbout?.mainTitle || "Ready to Become Our Next "} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF]">Success Story?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-16 transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            {firstAbout?.subtitle || "Join hundreds of satisfied clients who have transformed their businesses with our innovative digital engineering."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`group px-12 py-6 rounded-2xl font-black text-xl shadow-2xl flex items-center gap-3 transition-all duration-300 ${mode === "dark"
                ? "bg-white text-[#4F11C2] hover:bg-[#00E5FF] hover:text-black shadow-white/5"
                : "bg-[#4F11C2] text-white hover:bg-[#8B31FF] shadow-purple-500/20"}`}
            >
              {firstAbout?.ctaButtons[0]?.label || "Start Your Project"}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-12 py-6 backdrop-blur-md border-2 rounded-2xl font-black text-xl transition-all flex items-center gap-3 ${mode === "dark"
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "bg-white border-[#4F11C2]/20 text-[#4F11C2] hover:bg-gray-50 shadow-sm"}`}
            >
              <MessageCircle className="w-6 h-6" />
              {firstAbout?.ctaButtons[1]?.label || "Schedule Experts"}
            </motion.button>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: Star,
              title: "5-Star Experience",
              description: "Consistently rated 4.9/5 by our partners",
              color: "from-[#4F11C2] to-[#8B31FF]"
            },
            {
              icon: Users,
              title: "300+ Active Clients",
              description: "Trusted by visionaries worldwide",
              color: "from-[#8B31FF] to-[#00E5FF]"
            },
            {
              icon: MessageCircle,
              title: "24/7 Strategic Support",
              description: "Dedicated mastery for your mission",
              color: "from-[#00E5FF] to-[#4F11C2]"
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`backdrop-blur-xl border rounded-[2.5rem] p-10 text-center transition-all duration-500 ${mode === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-purple-50 shadow-[0_10px_40px_rgba(79,17,194,0.02)]"}`}
              >
                <div className={`inline-flex p-5 rounded-2xl mb-8 bg-gradient-to-br ${feature.color} shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-black mb-4 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`font-bold transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Review Form CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className={`max-w-4xl mx-auto backdrop-blur-2xl border rounded-[3rem] p-12 text-center relative overflow-hidden transition-all duration-500 ${mode === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white border-purple-50 shadow-2xl"}`}
        >
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4F11C2] to-[#00E5FF] opacity-5 -mr-32 -mt-32 blur-[80px] pointer-events-none`} />

          <h3 className={`text-3xl font-black mb-4 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
            Are You Our Next Partner?
          </h3>
          <p className={`text-lg mb-10 transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            We value the collaborative journey. Share your feedback and join the collective excellence of our digital network.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-10 py-5 rounded-2xl font-black shadow-xl transition-all duration-300 ${mode === "dark"
                ? "bg-white text-[#4F11C2] hover:bg-[#00E5FF] hover:text-black shadow-white/5"
                : "bg-[#4F11C2] text-white hover:bg-[#8B31FF] shadow-purple-500/20"}`}
            >
              Collaborate & Review
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-10 py-5 backdrop-blur-md border-2 rounded-2xl font-black transition-all ${mode === "dark"
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "bg-white border-purple-100 text-[#4F11C2] hover:bg-gray-50"}`}
            >
              Share Your Journey
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-24 flex flex-wrap justify-center items-center gap-12 md:gap-20"
        >
          {[
            { label: "Partner Satisfaction", value: "98%" },
            { label: "Strategic Success", value: "100%" },
            { label: "Engineering Quality", value: "99%" },
            { label: "Client Retention", value: "98%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center group"
            >
              <div className={`text-4xl md:text-5xl font-black mb-2 transition-colors duration-500 group-hover:text-[#4F11C2] ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                {stat.value}
              </div>
              <div className={`text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCTASection;
