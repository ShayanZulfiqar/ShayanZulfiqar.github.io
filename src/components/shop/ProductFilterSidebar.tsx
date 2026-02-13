"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, X, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProductFilterSidebarProps {
    className?: string;
}

const ProductFilterSidebar = ({ className = "" }: ProductFilterSidebarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [rating, setRating] = useState<number | null>(
        searchParams.get("minRating") ? Number(searchParams.get("minRating")) : null
    );
    const [inStock, setInStock] = useState(searchParams.get("inStock") === "true");
    const [brand, setBrand] = useState(searchParams.get("brand") || "");

    // Update Filters
    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (minPrice) params.set("minPrice", minPrice);
        else params.delete("minPrice");

        if (maxPrice) params.set("maxPrice", maxPrice);
        else params.delete("maxPrice");

        if (rating) params.set("minRating", rating.toString());
        else params.delete("minRating");

        if (inStock) params.set("inStock", "true");
        else params.delete("inStock");

        if (brand) params.set("brand", brand);
        else params.delete("brand");

        // Reset page to 1 on filter change
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    const clearFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setRating(null);
        setInStock(false);
        setBrand("");
        router.push("?");
    };

    return (
        <div className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm ${className}`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Filters</h3>
                <button
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-red-500 text-sm transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="mb-4 font-semibold text-gray-700">Price Range</h4>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <span className="top-1/2 left-3 absolute text-gray-500 text-sm -translate-y-1/2">$</span>
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="bg-gray-50 py-2 pl-6 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                        <span className="top-1/2 left-3 absolute text-gray-500 text-sm -translate-y-1/2">$</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="bg-gray-50 py-2 pl-6 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                    </div>
                </div>
            </div>

            {/* Brand (Simple Input for now) */}
            <div className="mb-8">
                <h4 className="mb-4 font-semibold text-gray-700">Brand</h4>
                <input
                    type="text"
                    placeholder="Search Brand..."
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border-gray-200 bg-gray-50 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
            </div>

            {/* Rating */}
            <div className="mb-8">
                <h4 className="mb-4 font-semibold text-gray-700">Rating</h4>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((r) => (
                        <div
                            key={r}
                            onClick={() => setRating(r)}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${rating === r ? 'border-purple-600 bg-purple-600' : 'border-gray-300 group-hover:border-purple-400'}`}>
                                {rating === r && <div className="bg-white rounded-full w-1.5 h-1.5" />}
                            </div>
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < r ? "currentColor" : "none"}
                                        className={i < r ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">& Up</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
                <h4 className="mb-4 font-semibold text-gray-700">Availability</h4>
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inStock ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white'}`}>
                        {inStock && <Check size={12} className="text-white" />}
                    </div>
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="hidden"
                    />
                    <span className="text-gray-700">In Stock Only</span>
                </label>
            </div>

            <button
                onClick={applyFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg w-full text-white font-medium py-3 rounded-xl transition-all"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default ProductFilterSidebar;
