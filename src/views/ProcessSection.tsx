"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lightbulb, Pencil, Code, Rocket, CheckCircle } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

const processSteps = [
  {
    icon: Lightbulb,
    title: "Discovery & Planning",
    description: "We start by understanding your vision, goals, and requirements. Our team conducts thorough research and creates a comprehensive project roadmap.",
    color: "from-[#4F11C2] to-[#8B31FF]",
    glow: "rgba(79, 17, 194, 0.4)",
    step: "01",
  },
  {
    icon: Pencil,
    title: "Design & Experience",
    description: "Our designers craft beautiful, user-centric interfaces. We create interactive prototypes to visualize the final product and gather feedback.",
    color: "from-[#8B31FF] to-[#00E5FF]",
    glow: "rgba(139, 49, 255, 0.4)",
    step: "02",
  },
  {
    icon: Code,
    title: "Development",
    description: "Our expert developers bring designs to life using cutting-edge technologies. We follow agile methodologies for efficient and quality delivery.",
    color: "from-[#2B00A4] to-[#4F11C2]",
    glow: "rgba(43, 0, 164, 0.4)",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous testing ensures bug-free, high-performance solutions. We test across devices, browsers, and scenarios for optimal quality.",
    color: "from-[#00E5FF] to-[#2B00A4]",
    glow: "rgba(0, 229, 255, 0.4)",
    step: "04",
  },
  {
    icon: Rocket,
    title: "Launch & Growth",
    description: "We deploy your project and provide ongoing support. Our team ensures smooth operations and continuous improvements post-launch.",
    color: "from-[#4F11C2] to-[#8B31FF]",
    glow: "rgba(79, 17, 194, 0.4)",
    step: "05",
  },
];

const BackgroundElements = ({ mode }: { mode: "light" | "dark" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
      {/* Base Background Overlay */}
      <div className={`absolute inset-0 transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"
        }`} />

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
      {/* Ambient Glows (Same as home page) */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#4F11C2]/10" : "bg-[#4F11C2]/5"}`} />
      <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#00E5FF]/5" : "bg-[#00E5FF]/3"}`} />
    </div>
  );
};

const ProcessCard = ({ step, index, mode }: { step: typeof processSteps[0], index: number, mode: "light" | "dark" }) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative h-full"
    >
      <div className={`relative h-full flex flex-col overflow-hidden rounded-[2rem] border backdrop-blur-md p-8 transition-all duration-500 ${mode === "dark"
        ? "bg-[#0B0F19]/50 border-white/10 hover:border-[#00E5FF]/30 hover:shadow-[0_0_30px_rgba(79,17,194,0.15)]"
        : "bg-white/70 border-gray-200 hover:border-[#4F11C2]/30 hover:shadow-[0_10px_30px_rgba(79,17,194,0.05)]"}`}>

        {/* Hover Gradient Overlay (From home page) */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#4F11C2]/0 via-[#4F11C2]/5 to-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10">
          {/* Icon Container (From home page) */}
          <div className="relative mb-8 inline-flex items-center justify-center">
            <div className={`absolute inset-0 blur-xl rounded-full transition-colors duration-500 ${mode === "dark" ? "bg-[#4F11C2]/20 group-hover:bg-[#00E5FF]/20" : "bg-[#4F11C2]/10 group-hover:bg-[#4F11C2]/20"}`} />
            <div className={`relative h-16 w-16 rounded-2xl border flex items-center justify-center transition-colors duration-500 shadow-lg ${mode === "dark"
              ? "bg-[#131620] border-white/10 group-hover:border-[#00E5FF]/50"
              : "bg-white border-gray-100 group-hover:border-[#4F11C2]/30"}`}>
              <Icon className={`h-8 w-8 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF] group-hover:text-white" : "text-[#4F11C2] group-hover:text-[#8B31FF]"}`} />
            </div>
          </div>

          <span className={`text-xs font-semibold tracking-widest uppercase mb-4 block ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
            Step {step.step}
          </span>
          <h3 className={`mb-4 text-2xl font-bold transition-colors duration-300 ${mode === "dark" ? "text-white group-hover:text-[#00E5FF]" : "text-gray-900 group-hover:text-[#4F11C2]"}`}>
            {step.title}
          </h3>
          <p className={`mb-8 leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700"}`}>
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className={`py-40 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
      <BackgroundElements mode={mode} />

      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 mb-6 ${mode === "dark"
              ? "border-[#4F11C2]/30 bg-[#4F11C2]/10 backdrop-blur-md"
              : "border-[#4F11C2]/20 bg-white/50"}`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-[#4F11C2]"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-[#4F11C2]"}`}></span>
            </span>
            <span className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
              Our Methodology
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold tracking-tight mb-6 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Strategic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF]">
              Project Lifecycle
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-lg leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            A rigorous, data-driven workflow engineered to transform ambitious visions into high-performance digital ecosystems.
          </motion.p>
        </div>

        <div className="relative">
          {/* THE SNIKE / ZIGZAG PATH - Desktop Only */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-visible z-0">
            <svg width="100%" height="100%" viewBox="0 0 1000 1300" preserveAspectRatio="none" className="overflow-visible absolute top-0">
              <defs>
                <linearGradient id="snaking-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4F11C2" />
                  <stop offset="50%" stopColor="#8B31FF" />
                  <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
                <filter id="path-glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base Path (Dotted) */}
              <motion.path
                d="M 250,50 C 250,200 750,200 750,350 C 750,500 250,500 250,650 C 250,800 750,800 750,950 C 750,1100 250,1100 250,1250"
                fill="none"
                stroke={mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(79,17,194,0.05)"}
                strokeWidth="6"
                strokeDasharray="16 16"
              />

              {/* Animated Snaking Path */}
              <motion.path
                style={{ pathLength }}
                d="M 250,50 C 250,200 750,200 750,350 C 750,500 250,500 250,650 C 250,800 750,800 750,950 C 750,1100 250,1100 250,1250"
                fill="none"
                stroke="url(#snaking-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#path-glow)"
              />

              {/* Moving Particle along the path */}
              <motion.circle
                style={{
                  offsetPath: "path('M 250,50 C 250,200 750,200 750,350 C 750,500 250,500 250,650 C 250,800 750,800 750,950 C 750,1100 250,1100 250,1250')",
                  offsetDistance: useTransform(pathLength, (v) => `${v * 100}%`)
                }}
                r="10"
                fill={mode === "dark" ? "#00E5FF" : "#4F11C2"}
                className={`drop-shadow-[0_0_20px_${mode === "dark" ? "#00E5FF" : "#4F11C2"}] z-20`}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-24 lg:gap-y-[200px] items-center">
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                {index % 2 === 0 ? (
                  <>
                    <ProcessCard step={step} index={index} mode={mode} />
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <ProcessCard step={step} index={index} mode={mode} />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
