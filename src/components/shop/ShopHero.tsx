"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import ShopHeroCard from "./ShopHeroCard";
import { ShopHero as ShopHeroType } from "@/types/shop";
import { getValidImageUrl } from "@/utils/imageUtils";
import ShopHeroLoader from "@/utils/ShopHeroLoader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchShopHeroes } from "@/store/slices/shopSlice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import images for backgrounds (fallback)
import bg1 from '@/assets/images/Untitled design.png';
import bg2 from '@/assets/images/Untitled design (1).png';
import bg3 from '@/assets/images/Futuristic Logo of HubMicroo.png';

const fallbackSlides = [
    {
        title: "Let's Shop Something Amazing!",
        subtitle: "Discover thousands of products from top brands at unbeatable prices",
        buttonText: "Explore Now",
        buttonLink: "#",
        image: bg1.src,
        overlayGradient: "from-purple-900/90 via-purple-900/40 to-transparent",
    },
    {
        title: "New Season Arrivals",
        subtitle: "Check out the latest trends and styles for this season",
        buttonText: "Shop New In",
        buttonLink: "#",
        image: bg2.src,
        overlayGradient: "from-blue-900/90 via-blue-900/40 to-transparent",
    },
    {
        title: "Exclusive Deals For You",
        subtitle: "Get up to 50% off on selected items for a limited time",
        buttonText: "View Offers",
        buttonLink: "#",
        image: bg3.src,
        overlayGradient: "from-red-900/90 via-red-900/40 to-transparent",
    },
];

const ShopHero = () => {
    const dispatch = useAppDispatch();
    const { data: heroData, loading } = useAppSelector((state) => state.shop.heroes);
    const [hoveredImage, setHoveredImage] = useState<any>(null); // State for hovered card image
    const [slides, setSlides] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchShopHeroes());
    }, [dispatch]);

    useEffect(() => {
        if (heroData && heroData.length > 0) {
            const mapped = heroData.map((item: ShopHeroType, index: number) => ({
                title: item.title,
                subtitle: item.description,
                buttonText: item.buttonText,
                buttonLink: item.buttonLink || "#",
                image: getValidImageUrl(item.image) || bg1.src,
                overlayGradient: index % 3 === 0
                    ? "from-purple-900/90 via-purple-900/40 to-transparent"
                    : index % 3 === 1
                        ? "from-blue-900/90 via-blue-900/40 to-transparent"
                        : "from-red-900/90 via-red-900/40 to-transparent"
            }));
            setSlides(mapped);
        } else if (!loading) {
            setSlides(fallbackSlides);
        }
    }, [heroData, loading]);

    if (loading) {
        return (
            <div className="h-[350px] md:h-[500px] bg-white flex items-center justify-center">
                <ShopHeroLoader />
            </div>
        );
    }

    return (
        <section className="relative h-[350px] md:h-[500px] overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
                    bulletActiveClass: '!opacity-100 !bg-white',
                }}
                loop={slides.length > 1}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Background Image */}
                            <Image
                                src={slide.image}
                                alt="Hero Background"
                                fill
                                className="object-cover"
                                priority={index === 0}
                                unoptimized
                            />

                            {/* Hovered Image Overlay */}
                            <div
                                className={`absolute inset-0 transition-opacity duration-500 z-10 ${hoveredImage ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {hoveredImage && (
                                    <Image
                                        src={hoveredImage}
                                        alt="Hovered Preview"
                                        fill
                                        className="object-cover blur-sm scale-105"
                                        unoptimized
                                    />
                                )}
                            </div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r ${slide.overlayGradient} z-10`} />
                            <div className="absolute inset-0 bg-black/20 z-0" />

                            {/* Content Container */}
                            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row items-center z-20">
                                {/* Text Content */}
                                <div className="text-white max-w-2xl z-20 text-center md:text-left pt-10 md:pt-0 w-full md:w-1/2 flex flex-col items-center md:items-start pointer-events-none">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-md">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl mb-6 md:mb-8 text-white/90 drop-shadow-sm max-w-lg">
                                        {slide.subtitle}
                                    </p>
                                    <a href={slide.buttonLink} className="bg-white text-gray-900 px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-lg active:scale-95 pointer-events-auto">
                                        {slide.buttonText}
                                    </a>
                                </div>

                                {/* 3D Hero Card - hidden on mobile */}
                                <div className="w-full md:w-1/2 h-[300px] md:h-full relative mt-4 md:mt-0 hidden md:flex items-center justify-center scale-90 md:scale-100">
                                    <div className="w-full h-full relative z-0 md:absolute md:right-0 md:top-0 md:bottom-0">
                                        <ShopHeroCard onCardHover={setHoveredImage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ShopHero;
