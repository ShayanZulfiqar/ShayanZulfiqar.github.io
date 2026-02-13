"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Product } from "@/types/shop";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { removeFromWishlist } from "@/store/slices/wishlistSlice";
import { useRouter } from "next/navigation";
import { getValidImageUrl } from "@/utils/imageUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface WishlistCardProps {
    product: Product;
}

const WishlistCard = ({ product }: WishlistCardProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleBuyNow = () => {
        dispatch(addToCart({ product, quantity: 1 }));
        router.push("/checkout");
    };

    const handleRemove = () => {
        console.log("Removing product with ID:", product._id);
        dispatch(removeFromWishlist(product._id));
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity: 1 }));
    };

    // Swiper imports should be at the top, adding them now
    // Since I can't add imports with a partial replace block easily if they are not there, 
    // I will replace the component body logic.
    // Wait, I need to add imports first or replace the whole file. 
    // Replacing logic to use Swiper.

    const productImages = product.images && product.images.length > 0
        ? product.images.map(img => getValidImageUrl(img)).filter((img): img is string => img !== null)
        : [];

    const images = productImages.length > 0
        ? productImages
        : ["https://dummyimage.com/300x200/e0e0e0/ffffff&text=No+Image"];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row gap-6 items-center"
        >
            {/* Image Carousel */}
            <div className="shrink-0 w-full sm:w-48 h-48 sm:h-32 rounded-xl overflow-hidden relative">
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    loop={images.length > 1}
                    autoplay={images.length > 1 ? {
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    } : false}
                    className="w-full h-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Link href={`/shop/product/${product._id}`} className="block w-full h-full relative">
                                <img
                                    src={img}
                                    alt={`${product.name} - image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {product.discountPrice && product.discountPrice < product.price && (
                    <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -
                        {Math.round(
                            ((product.price - product.discountPrice) / product.price) * 100
                        )}
                        %
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 w-full text-center sm:text-left">
                <Link href={`/shop/product/${product._id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-purple-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 mb-2 font-medium">
                    {typeof product.category === 'object' ? product.category?.name : product.category}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                    <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={
                                    i < Math.floor(product.rating || 0)
                                        ? "fill-current"
                                        : "text-gray-300"
                                }
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400">
                        ({product.numReviews || 0} reviews)
                    </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <span className="text-2xl font-bold text-gray-900">
                        ${(product.discountPrice || product.price || 0).toFixed(2)}
                    </span>
                    {product.discountPrice && product.discountPrice < product.price && (
                        <span className="text-sm text-gray-400 line-through">
                            ${(product.price || 0).toFixed(2)}
                        </span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full sm:w-auto min-w-[160px]">
                <button
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Buy Now <ArrowRight size={18} />
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                        <ShoppingCart size={18} />
                        Add
                    </button>

                    <button
                        onClick={handleRemove}
                        className="flex items-center justify-center p-2.5 border border-red-100 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                        title="Remove from wishlist"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default WishlistCard;
