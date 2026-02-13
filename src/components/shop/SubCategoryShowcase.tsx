"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SubCategory, Product } from "@/types/shop";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import { fetchProductSubCategories, fetchProducts } from "@/store/slices/shopSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const SubCategoryShowcase = () => {
    const dispatch = useAppDispatch();
    const { data: subCategoriesRecords, loading: loadingSubs } = useAppSelector((state) => state.shop.subCategories);
    const { data: products, loading: loadingProducts } = useAppSelector((state) => state.shop.products);

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [activeSubId, setActiveSubId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchProductSubCategories());
    }, [dispatch]);

    useEffect(() => {
        if (subCategoriesRecords && subCategoriesRecords.length > 0) {
            const activeSubs = subCategoriesRecords.filter((sub: SubCategory) => sub.isActive).slice(0, 6);
            setSubCategories(activeSubs);
            if (!activeSubId) {
                setActiveSubId(activeSubs[0]._id);
            }
        }
    }, [subCategoriesRecords]);

    useEffect(() => {
        if (!activeSubId) return;
        dispatch(fetchProducts({ subCategory: activeSubId, limit: 4 }));
    }, [dispatch, activeSubId]);

    if (loadingSubs) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (subCategories.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-100 text-purple-700 text-sm font-bold tracking-wider uppercase"
                    >
                        Explore by Style
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        Shop Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">Sub-Categories</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Dive deep into our curated collections designed for every taste and occasion.
                    </p>
                </div>

                {/* Subcategory Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {subCategories.map((sub) => (
                        <button
                            key={sub._id}
                            onClick={() => setActiveSubId(sub._id)}
                            className={`relative px-8 py-3 rounded-2xl font-bold transition-all duration-300 overflow-hidden group ${activeSubId === sub._id
                                ? "text-white"
                                : "text-gray-600 bg-white hover:bg-gray-100 shadow-sm"
                                }`}
                        >
                            {activeSubId === sub._id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{sub.name}</span>
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="min-h-[400px] relative">
                    <AnimatePresence mode="wait">
                        {loadingProducts ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Loader2 className="w-12 h-12 animate-spin text-pink-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeSubId || "empty"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            >
                                {products.length > 0 ? (
                                    products.map((product, idx) => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-gray-500">
                                        No products found in this sub-category yet.
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* View More Link */}
                <div className="mt-16 text-center">
                    <Link
                        href={`/shop?subCategory=${activeSubId}`}
                        className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:gap-4 group"
                    >
                        View Collection <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SubCategoryShowcase;
