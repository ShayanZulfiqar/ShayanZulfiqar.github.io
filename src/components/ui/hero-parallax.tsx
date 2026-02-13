"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
    AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

// --- Background Components ---
const BackgroundElements = ({ mode }: { mode: "light" | "dark" }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
            {/* Base Gradient Ambience */}
            <div className={`absolute top-0 left-0 w-full h-[50vh] blur-[120px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#4F11C2]/10 opacity-100" : "bg-[#4F11C2]/5 opacity-50"}`} />
            <div className={`absolute bottom-0 right-0 w-full h-[50vh] blur-[120px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#8B31FF]/10 opacity-100" : "bg-[#8B31FF]/5 opacity-50"}`} />

            {/* Grid Pattern */}
            <div
                className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.03]" : "opacity-[0.05]"}`}
                style={{
                    backgroundImage: mode === "dark"
                        ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
                        : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Floating Orbs */}
            <motion.div
                className={`absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-[#4F11C2] rounded-full mix-blend-screen transition-opacity duration-700 filter blur-[100px] ${mode === "dark" ? "opacity-20" : "opacity-10"}`}
                animate={{
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={`absolute top-[40%] right-[10%] w-[40vw] h-[40vw] bg-[#00E5FF] rounded-full mix-blend-screen transition-opacity duration-700 filter blur-[120px] ${mode === "dark" ? "opacity-10" : "opacity-5"}`}
                animate={{
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Stars - Only show in dark mode */}
            {mode === "dark" && [...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full opacity-20"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: Math.random() * 2 + 1 + 'px',
                        height: Math.random() * 2 + 1 + 'px',
                    }}
                />
            ))}
        </div>
    );
};


export const HeroParallax = ({
    products,
}: {
    products: {
        title: string;
        link: string;
        thumbnail: string;
    }[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 100, damping: 20, mass: 1 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 800]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -800]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [0.1, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [10, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [-600, 100]),
        springConfig
    );
    const { mode } = useAppSelector((state) => state.theme);

    return (
        <div
            ref={ref}
            className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <BackgroundElements mode={mode} />

            <Header mode={mode} />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                            mode={mode}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row  mb-20 space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                            mode={mode}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                            mode={mode}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = ({ mode }: { mode: "light" | "dark" }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            badge: "Creative Excellence",
            title: "The Ultimate Development Studio",
            desc: "We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products.",
            cta1: "Get Started",
            cta2: "View Portfolio"
        },
        {
            badge: "Next-Gen Technology",
            title: "Innovating the Future of Tech",
            desc: "Transforming ideas into reality with cutting-edge solutions. Our expertise spans across full-stack development, AI integration, and cloud architecture.",
            cta1: "Our Services",
            cta2: "Contact Us"
        },
        {
            badge: "Business Growth",
            title: "Scalable Solutions for Growth",
            desc: "Empowering businesses with robust and scalable software. From startups to enterprises, we deliver code that stands the test of time and traffic.",
            cta1: "Start Scaling",
            cta2: "Learn More"
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Increased duration slightly to allow reading and clicking
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 h-[40rem] flex flex-col justify-center pointer-events-none">
            {/* pointer-events-none to let click through background if needed, but buttons need pointer-events-auto */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-20"
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${mode === "dark"
                        ? "border-[#4F11C2]/30 bg-[#4F11C2]/10 shadow-[0_0_15px_rgba(79,17,194,0.3)]"
                        : "border-[#4F11C2]/20 bg-white/50 shadow-sm"} mb-6 backdrop-blur-md`}>
                        <Sparkles className="w-3 h-3 text-[#4F11C2] animate-pulse" />
                        <span className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
                            {slides[currentSlide].badge}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-7xl font-bold text-[#4F11C2] mb-8 tracking-tight">
                        {slides[currentSlide].title.split(" ").map((word, i) => (
                            <span
                                key={i}
                                className={`inline-block mr-3 transition-colors duration-300 ${i % 2 === 0
                                    ? (mode === "dark" ? "text-white" : "text-gray-900")
                                    : "text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]"}`}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                    <p className={`max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow-sm mb-10 transition-colors duration-300 ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {slides[currentSlide].desc}
                    </p>


                    <div className="flex flex-wrap gap-4 pointer-events-auto">
                        <Link href="/contact">
                            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white font-semibold shadow-[0_0_20px_rgba(79,17,194,0.5)] hover:shadow-[0_0_30px_rgba(79,17,194,0.7)] hover:scale-105 transition-all duration-300">
                                {slides[currentSlide].cta1}
                            </button>
                        </Link>
                        <Link href="/portfolio">
                            <button className={`px-8 py-3 rounded-full border transition-all duration-300 font-semibold ${mode === "dark"
                                ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-[#00E5FF]/50 hover:text-[#00E5FF]"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#4F11C2]/50 hover:text-[#4F11C2]"} backdrop-blur-sm shadow-sm`}>
                                {slides[currentSlide].cta2}
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
    mode,
}: {
    product: {
        title: string;
        link: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
    mode: "light" | "dark";
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className={`group/product h-96 w-[30rem] relative flex-shrink-0 backdrop-blur-sm border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-xl overflow-hidden ${mode === "dark"
                ? "bg-black/40 border-white/10 hover:border-[#00E5FF]/80 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]"
                : "bg-white/70 border-gray-200 hover:border-[#4F11C2]/50 hover:shadow-[0_15px_40px_rgba(79,17,194,0.15)]"
                }`}
        >
            <Link
                href={product.link}
                className="block h-full w-full"
            >
                <img
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-left-top absolute h-full w-full inset-0 transition-transform duration-700 group-hover/product:scale-110"
                    alt={product.title}
                />
            </Link>

            {/* Always visible gradient for text readability */}
            <div className={`absolute inset-0 h-full w-full bg-gradient-to-t via-transparent to-transparent pointer-events-none opacity-90 transition-colors duration-500 ${mode === "dark"
                ? "from-[#0B0F19]"
                : "from-white"}`} />


            {/* Hover overlay */}
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-30 bg-[#4F11C2] pointer-events-none transition-opacity duration-300 mix-blend-overlay"></div>

            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <h2 className={`font-bold text-2xl drop-shadow-md mb-2 group-hover/product:text-[#00E5FF] transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                    {product.title}
                </h2>
                <div className={`h-1 w-12 rounded-full transform origin-left scale-x-0 group-hover/product:scale-x-100 transition-transform duration-300 delay-100 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-[#4F11C2]"}`} />
            </div>
        </motion.div>
    );
};
