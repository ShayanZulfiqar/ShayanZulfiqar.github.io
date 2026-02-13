import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/types/shop";
import Link from "next/link";
import { getValidImageUrl } from "@/utils/imageUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode, Navigation } from "swiper/modules";
import { ChevronRight, LayoutGrid } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";

interface ShopByCategorySectionProps {
    categories: Category[];
}

const ShopByCategorySection: React.FC<ShopByCategorySectionProps> = ({ categories }) => {
    return (
        <section className="py-8 md:py-16 bg-transparent overflow-hidden">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <LayoutGrid className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                                Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Categories</span>
                            </h2>
                            <p className="text-gray-500 text-sm font-medium">Explore hand-picked items by category</p>
                        </div>
                    </div>
                </div>

                <div className="relative group/carousel px-4 md:px-0">
                    {/* Linear Gradient Masks for Soft Edges */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none hidden md:block" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none hidden md:block" />

                    <Swiper
                        modules={[Autoplay, Pagination, FreeMode, Navigation]}
                        spaceBetween={24}
                        slidesPerView={1.2}
                        freeMode={true}
                        centeredSlides={false}
                        navigation={{
                            nextEl: '.category-next',
                            prevEl: '.category-prev',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2.2 },
                            768: { slidesPerView: 3.2 },
                            1024: { slidesPerView: 4.2 },
                            1280: { slidesPerView: 5.2 },
                        }}
                        className="!pb-14 !px-4 md:!px-0"
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={category._id || index}>
                                <Link href={`/shop/${category.slug}`}>
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 bg-white"
                                    >
                                        {/* Background Image with Zoom Layer */}
                                        <div className="absolute inset-0 bg-gray-50 overflow-hidden">
                                            <img
                                                src={getValidImageUrl(category.image) || "https://dummyimage.com/600x800/e0e0e0/ffffff&text=Category"}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                            />
                                            {/* Advanced Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-purple-600/20 transition-all duration-500" />
                                        </div>

                                        {/* Content - Glassmorphism Card */}
                                        <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/90 group-hover:translate-y-[-10px]">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-200 group-hover:text-purple-600 transition-colors">
                                                    {category.subCategories?.length || 0} Collections
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-purple-600 flex items-center justify-center transition-all duration-500 group-hover:rotate-[-45deg]">
                                                    <ChevronRight size={16} className="text-white" />
                                                </div>
                                            </div>
                                            <h3 className="text-white text-xl font-bold group-hover:text-gray-900 transition-colors truncate">
                                                {category.name}
                                            </h3>
                                            <p className="text-white/70 text-xs hidden sm:block line-clamp-1 group-hover:text-gray-500 transition-colors mt-1 font-medium">
                                                {category.description || `Browse the best of ${category.name}`}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Refined Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-6 z-30 opacity-0 group-hover/carousel:opacity-100 transition-all duration-400 transform translate-x-4 group-hover/carousel:translate-x-0 pointer-events-none">
                        <button className="category-prev w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all pointer-events-auto active:scale-95 group/btn">
                            <ChevronRight size={28} className="rotate-180 group-hover/btn:-translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-6 z-30 opacity-0 group-hover/carousel:opacity-100 transition-all duration-400 transform -translate-x-4 group-hover/carousel:translate-x-0 pointer-events-none">
                        <button className="category-next w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all pointer-events-auto active:scale-95 group/btn">
                            <ChevronRight size={28} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: #d1d5db !important;
                    opacity: 1 !important;
                    transition: all 0.3s ease !important;
                }
                .swiper-pagination-bullet-active {
                    background: #9333ea !important;
                    width: 24px !important;
                    border-radius: 6px !important;
                }
            `}</style>
        </section>
    );
};

export default ShopByCategorySection;
