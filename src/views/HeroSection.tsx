"use client";

import React, { useState, useEffect } from "react";
import { motion, animate, AnimatePresence, useMotionValue } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Globe, Rocket, Shield, Zap, TrendingUp, Users, Target, Award, Cpu, Boxes, Layout, Layers, MousePointer2, Code2, Terminal, Laptop } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchHeroSections, fetchClientStats } from "@/store/slices/landingSlice";

// --- Utility Icons ---
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Rocket: <Rocket className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />,
    Shield: <Shield className="w-8 h-8" />,
    Globe: <Globe className="w-8 h-8" />,
    TrendingUp: <TrendingUp className="w-8 h-8" />,
    Users: <Users className="w-8 h-8" />,
    Target: <Target className="w-8 h-8" />,
    Award: <Award className="w-8 h-8" />,
    Cpu: <Cpu className="w-8 h-8" />,
    Boxes: <Boxes className="w-8 h-8" />,
    Layout: <Layout className="w-8 h-8" />,
    Layers: <Layers className="w-8 h-8" />,
    MousePointer2: <MousePointer2 className="w-8 h-8" />,
    Code2: <Code2 className="w-8 h-8" />,
    Terminal: <Terminal className="w-8 h-8" />,
    Laptop: <Laptop className="w-8 h-8" />
  };
  return icons[iconName] || <Rocket className="w-8 h-8" />;
};

// --- Animated Counter ---
const Counter = ({ value, label }: { value: string; label: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericMatch = value.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0]) : 0;
  const suffix = value.replace(/\d+/g, '');

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration: 2.5,
      delay: 0.5,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      ease: [0.33, 1, 0.68, 1]
    });
    return () => controls.stop();
  }, [numericValue]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center group cursor-default">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-[#4F11C2]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm group-hover:-translate-y-1 transition-transform duration-500 shadow-lg">
          <Sparkles size={20} className="text-[#00E5FF] opacity-90" />
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
          {displayValue}{suffix}
        </h3>
      </div>
      <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide uppercase">{label}</p>
    </div>
  );
};

// --- Professional Background (Updated Colors) ---
const PremiumBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B0F19]">
      {/* 1. Base Gradient Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4F11C2]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#8B31FF]/10 rounded-full blur-[100px] mix-blend-screen" />

      {/* 2. Cinematic Beam/Spotlight Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,17,194,0.15),rgba(11,15,25,0))]" />

      {/* 3. Moving Perspective Grid */}
      <div className="absolute inset-0 perspective-[500px]">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4F11C220_1px,transparent_1px),linear-gradient(to_bottom,#4F11C220_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 5%, black 40%, black 70%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 40%, black 70%, transparent 95%)'
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px 24px"]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear"
          }}
        />
      </div>

      {/* 4. Fine Grain Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150 mix-blend-overlay pointer-events-none" />

      {/* 5. Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0F19] to-transparent z-10" />
    </div>
  );
};

// --- Star Field for Depth ---
const StarField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() < 0.5 ? 1 : 2,
            height: Math.random() < 0.5 ? 1 : 2,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

const HeroSection = () => {
  const dispatch = useAppDispatch();
  const [swiper, setSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse interaction for subtle 3D tilt effect on text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;
    mouseX.set(moveX / 50);
    mouseY.set(moveY / 50);
  };

  const { data: heroSlides, loading: heroLoading } = useAppSelector((state) => state.landing.hero);
  const { data: statsData, loading: statsLoading } = useAppSelector((state) => state.landing.clientStats);
  const stats = statsData.slice(0, 4);

  useEffect(() => {
    dispatch(fetchHeroSections());
    dispatch(fetchClientStats());
  }, [dispatch]);

  const handleSlideChange = (s: any) => {
    setActiveIndex(s.activeIndex);
  };

  const isLoading = heroLoading || statsLoading;

  if (isLoading || heroSlides.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#4F11C2] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        className="relative overflow-hidden min-h-[110vh] bg-[#0B0F19]"
        onMouseMove={handleMouseMove}
      >
        <PremiumBackground />
        <StarField />

        <Swiper
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="background: ${activeIndex === index ? '#8B31FF' : 'white'} !important; opacity: ${activeIndex === index ? '1' : '0.2'}; width: ${activeIndex === index ? '40px' : '6px'}; height: 4px; border-radius: 2px; transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); margin: 0 4px !important;"></span>`;
            },
          }}
          navigation={false}
          loop={true}
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide._id || slide.id || index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative flex flex-col justify-center items-center pt-32 pb-48 min-h-[110vh]"
              >
                {/* Content Container */}
                <div className="z-10 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                  {/* Premium Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#4F11C2]/30 bg-[#4F11C2]/10 backdrop-blur-md hover:bg-[#4F11C2]/20 transition-colors duration-300"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]"
                      style={{ backgroundColor: slide.badgeColor || '#00E5FF', color: slide.badgeColor || '#00E5FF' }}
                    />
                    <span className="font-medium text-[#00E5FF] text-xs tracking-[0.2em] uppercase">
                      {slide.badge}
                    </span>
                  </motion.div>

                  {/* Main Headline */}
                  <div className="relative mb-8 mx-auto max-w-6xl perspective-[1000px]">
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ x: mouseX, y: mouseY }}
                      className="font-bold text-white text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight relative z-20"
                    >
                      {slide.title}
                      <br className="hidden md:block" />
                      <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#8B31FF] via-[#4F11C2] to-[#00E5FF]">
                        {/* Soft Glow */}
                        <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-[#8B31FF] via-[#4F11C2] to-[#00E5FF]">
                          {slide.highlight}
                        </span>
                        {/* Text */}
                        <span className="relative bg-clip-text text-transparent">
                          {slide.highlight}
                        </span>
                      </span>
                    </motion.h1>

                    {/* Decorative Elements */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute -top-20 -right-20 w-64 h-64 bg-[#4F11C2]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
                    />
                  </div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mx-auto mb-12 max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed max-w-[60ch]"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-5"
                  >
                    <button className="group relative h-14 px-10 rounded-full bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white font-semibold text-base overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(139,49,255,0.4)]">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]" />
                      <span className="relative flex items-center gap-2">
                        Get Started Now
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>

                    <button className="h-14 px-8 rounded-full border border-[#4F11C2]/30 bg-[#4F11C2]/5 backdrop-blur-md text-white font-medium text-base hover:bg-[#4F11C2]/10 transition-all hover:scale-105 active:scale-95 hover:border-[#4F11C2]/50">
                      View Showreel
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation - Minimal */}
        <div className="absolute bottom-12 right-12 z-20 flex gap-4 hidden md:flex">
          <button onClick={() => swiper?.slidePrev()} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-[#4F11C2]/20 hover:border-[#4F11C2]/30 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => swiper?.slideNext()} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-[#4F11C2]/20 hover:border-[#4F11C2]/30 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </section>

      {/* Stats Section - Floating Deck */}
      <div className="relative z-30 -mt-32 px-4 pb-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto pointer-events-auto"
        >
          <div className="relative backdrop-blur-3xl bg-[#0B0F19]/80 border border-[#4F11C2]/20 rounded-[2rem] p-10 overflow-hidden shadow-2xl shadow-[#4F11C2]/10">
            {/* Top sheen */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B31FF]/50 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, index) => (
                <div key={stat._id || stat.id} className="relative">
                  <Counter value={stat.value} label={stat.label} />
                  {/* Dividers */}
                  {index < stats.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;