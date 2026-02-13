"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { get } from "@/services/ApiService";
import { GET_PRODUCT_BY_ID, GET_PRODUCTS } from "@/services/ApiRoutes";
import { Product, ProductFilterParams } from "@/types/shop";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { getValidImageUrl } from "@/utils/imageUtils";
import { motion } from "framer-motion";
import {
    Star,
    ShoppingCart,
    Heart,
    Share2,
    ChevronRight,
    ShieldCheck,
    Truck,
    RotateCcw,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductDetailPage = () => {
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const wishlistItems = useAppSelector((state) => state.wishlist.items);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string>("");
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const isWishlisted = product ? wishlistItems.some((item) => item._id === product._id) : false;

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const res = await get(GET_PRODUCT_BY_ID(id));
                if (res.success) {
                    const productData = res.data;
                    setProduct(productData);
                    if (productData.images && productData.images.length > 0) {
                        setActiveImage(getValidImageUrl(productData.images[0]) || "");
                    }

                    // Fetch related products (e.g., same category)
                    if (productData.category) {
                        const catId = typeof productData.category === 'object' ? productData.category._id : productData.category;
                        const queryString = new URLSearchParams({
                            category: catId,
                            limit: "4"
                        } as any).toString();
                        const relatedRes = await get(`${GET_PRODUCTS}?${queryString}`);
                        if (relatedRes.success) {
                            setRelatedProducts(relatedRes.data.filter((p: Product) => p._id !== productData._id));
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ product, quantity }));
        }
    };

    const handleBuyNow = () => {
        if (product) {
            dispatch(addToCart({ product, quantity }));
            router.push("/checkout");
        }
    };

    const toggleWishlist = () => {
        if (!product) return;
        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <ShopHeader />
                <div className="flex justify-center items-center h-screen pt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <ShopHeader />
                <div className="flex flex-col justify-center items-center h-screen pt-20">
                    <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                    <Link href="/shop" className="text-purple-600 hover:underline mt-4">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const images = product.images?.map((img) => getValidImageUrl(img)).filter(Boolean) as string[] || [];

    // Split description into bullet points if it's long, or just use it as is
    const descriptionPoints = product.description.split('.').filter(point => point.trim().length > 0);

    return (
        <div className="min-h-screen bg-white font-sans">
            <ShopHeader />

            <main className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/shop" className="hover:text-purple-600">Shop</Link>
                    <ChevronRight size={16} className="mx-2" />
                    <Link href={`/shop/${typeof product.category === 'object' ? product.category.slug : 'category'}`} className="hover:text-purple-600">
                        {typeof product.category === 'object' ? product.category.name : 'Category'}
                    </Link>
                    <ChevronRight size={16} className="mx-2" />
                    <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
                            <img
                                src={activeImage || "https://dummyimage.com/600x600/e0e0e0/ffffff&text=No+Image"}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain"
                            />
                            <button
                                onClick={toggleWishlist}
                                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
                            >
                                <Heart size={24} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
                            </button>
                        </div>

                        {/* Thumbnails using Swiper */}
                        {images.length > 0 && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={5}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="thumbs-swiper h-24"
                            >
                                {images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`w-full h-full border-2 rounded-lg cursor-pointer overflow-hidden p-1 ${activeImage === img ? 'border-purple-600' : 'border-gray-200 hover:border-gray-300'}`}
                                            onClick={() => setActiveImage(img)}
                                            onMouseEnter={() => setActiveImage(img)}
                                        >
                                            <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-contain" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    {/* Right Column: Product Details */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>

                        <Link href={`/shop/brand/${product.brand || 'generic'}`} className="text-purple-600 hover:underline text-sm font-medium mb-4 block">
                            Visit the {product.brand || 'HubMicro'} Store
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-purple-600 hover:underline text-sm font-medium cursor-pointer">
                                {product.numReviews} ratings
                            </span>
                        </div>

                        {/* Price Block */}
                        <div className="border-t border-b border-gray-100 py-6 mb-6">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-red-600 text-lg font-medium">-{Math.round(((product.price - (product.discountPrice || product.price)) / product.price) * 100)}%</span>
                                <span className="text-4xl font-bold text-gray-900">
                                    ${(product.discountPrice || product.price).toFixed(2)}
                                </span>
                            </div>
                            {product.discountPrice && (
                                <div className="text-gray-500 text-sm">
                                    List Price: <span className="line-through">${product.price.toFixed(2)}</span>
                                </div>
                            )}
                            <p className="text-gray-500 text-sm mt-2">All prices include VAT.</p>
                        </div>

                        {/* Features / About */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 mb-3">About this item</h3>
                            <ul className="space-y-2 list-disc list-outside ml-5 text-gray-700 text-sm">
                                {descriptionPoints.map((point, idx) => (
                                    <li key={idx}>{point.trim()}.</li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions / Buy Box */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="text-green-600 font-medium text-lg mb-4">In Stock.</div>

                            <div className="flex items-center gap-4 mb-6">
                                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 w-20"
                                >
                                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-3 rounded-full shadow-sm transition-colors text-sm uppercase tracking-wide"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg text-white font-bold py-3 rounded-full transition-all text-sm uppercase tracking-wide transform active:scale-[0.98]"
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="mt-4 space-y-2 text-xs text-gray-500">
                                <div className="flex gap-2">
                                    <span className="w-20 text-gray-400">Ships from</span>
                                    <span>HubMicro</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-20 text-gray-400">Sold by</span>
                                    <span>HubMicro Official</span>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 mt-8 py-4 border-t border-gray-100">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                                    <RotateCcw size={20} />
                                </div>
                                <span className="text-xs text-gray-600">7 Days Return</span>
                            </div>
                            {/* Removed warranty as per previous user edit if that was intentional? 
                  User removed it in Step 211. I will respect that removal. 
                  But wait, the user's edit removed the middle one. I'll just keep the remaining two or add Fast Delivery back if it was there.
                  Looking at previous state, Fast delivery was 3rd. User removed middle.
                  The snippet shows 2 remaining div blocks (Blue and Green).
                  I will write back the 2 blocks.
              */}
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-green-50 text-green-600 rounded-full">
                                    <Truck size={20} />
                                </div>
                                <span className="text-xs text-gray-600">Fast Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="mt-16 bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Specifications</h3>
                            <dl className="space-y-4 text-sm">
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-gray-500 font-medium">Brand</dt>
                                    <dd className="col-span-2 text-gray-900">{product.brand || "HubMicro Generic"}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-gray-500 font-medium">Category</dt>
                                    <dd className="col-span-2 text-gray-900 capitalize">
                                        {typeof product.category === 'object' ? product.category.name : 'General'}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-gray-500 font-medium">Model Number</dt>
                                    <dd className="col-span-2 text-gray-900">{product._id.substring(0, 8).toUpperCase()}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-gray-500 font-medium">Stock Status</dt>
                                    <dd className="col-span-2 text-green-600 font-medium">{product.stock > 0 ? "In Stock" : "Out of Stock"}</dd>
                                </div>
                                {/* Mock Specs if actual ones aren't in the type yet */}
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-gray-500 font-medium">Warranty</dt>
                                    <dd className="col-span-2 text-gray-900">1 Year Manufacturer Warranty</dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Shipping & Returns</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex gap-3">
                                    <Truck size={18} className="text-purple-600 shrink-0" />
                                    <span>Free shipping on all orders over $50. Standard delivery typically takes 3-5 business days.</span>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck size={18} className="text-purple-600 shrink-0" />
                                    <span>We offer a 7-day hassle-free return policy. If you're not satisfied, return it in original condition.</span>
                                </li>
                                <li className="flex gap-3">
                                    <RotateCcw size={18} className="text-purple-600 shrink-0" />
                                    <span>Secure packaging to ensure your items arrive safely.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Similar Items */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 border-t border-gray-200 pt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar items to consider</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <div key={p._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                    <Link href={`/shop/product/${p._id}`}>
                                        <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gray-50">
                                            <img
                                                src={p.images && p.images[0] ? getValidImageUrl(p.images[0]) || "" : ""}
                                                alt={p.name}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 hover:text-purple-600">{p.name}</h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className="fill-current" />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500">({p.numReviews})</span>
                                        </div>
                                        <div className="font-bold text-gray-900">${p.price.toFixed(2)}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <ShopFooter />
        </div>
    );
};

export default ProductDetailPage;
