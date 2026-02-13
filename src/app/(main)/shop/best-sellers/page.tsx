"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ProductCard from "@/components/shop/ProductCard";
import { Award, SlidersHorizontal, Grid3x3, List, ChevronDown, Crown, Trophy, Star, TrendingUp, Loader2 } from "lucide-react";
import { ShopBestSeller, Product, Category } from "@/types/shop";

import { fetchBestSellers, fetchProducts, fetchProductCategories } from "@/store/slices/shopSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const BestSellersPage = () => {
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minRating, setMinRating] = useState(0);

  const { data: bestSellersRecords, loading: heroLoading } = useAppSelector((state) => state.shop.bestSellers);
  const { data: allCategories } = useAppSelector((state) => state.shop.categories);
  const { data: products, loading } = useAppSelector((state) => state.shop.products);

  const bestSellerData = bestSellersRecords && bestSellersRecords.length > 0 ? bestSellersRecords[0] : null;

  useEffect(() => {
    dispatch(fetchBestSellers());
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    const params: any = {
      isBestSeller: true,
      limit: 100,
      maxPrice: priceRange[1],
      minRating: minRating,
      sort: sortBy
    };
    if (selectedCategory !== "all") {
      params.category = selectedCategory;
    }
    dispatch(fetchProducts(params));
  }, [dispatch, priceRange, selectedCategory, sortBy, minRating]);

  const bestSellers = products;

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader categories={allCategories} />

      <main className="pt-40 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 py-20 overflow-hidden min-h-[400px] flex items-center">
          <div className="absolute inset-0 bg-black/5" />

          {/* Animated Trophy Icons */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 1000,
                  y: 600,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  y: -100,
                  opacity: [0, 0.3, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <Trophy className="text-white/20" size={24} />
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            {heroLoading ? (
              <div className="flex flex-col items-center justify-center text-white gap-4">
                <Loader2 className="animate-spin" size={48} />
                <p className="text-xl font-medium">Fetching our champions...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Crown className="text-yellow-300" size={48} />
                  <Award className="text-white" size={48} />
                  <Trophy className="text-yellow-300" size={48} />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  {bestSellerData?.title || "Best Sellers"}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  {bestSellerData?.description || "Top-rated products loved by thousands of customers worldwide. Proven quality, exceptional value."}
                </p>

                {/* Featured Stats */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-white">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
                    <div className="text-3xl font-bold mb-1">{bestSellerData?.unitSoldNumber || "25K+"}</div>
                    <div className="text-white/80 text-sm">Units Sold</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
                    <div className="text-3xl font-bold mb-1">{bestSellerData?.avgRatingNumber || "4.9"}★</div>
                    <div className="text-white/80 text-sm">Avg Rating</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
                    <div className="text-3xl font-bold mb-1">{bestSellerData?.satisfactionNumber || "98%"}</div>
                    <div className="text-white/80 text-sm">Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Award,
                  title: "Quality Guaranteed",
                  description: "Every best seller is verified for quality",
                  color: "blue",
                },
                {
                  icon: TrendingUp,
                  title: "Consistently Popular",
                  description: "Purchased thousands of times monthly",
                  color: "cyan",
                },
                {
                  icon: Star,
                  title: "Highly Rated",
                  description: "Average rating of 4.8 stars or higher",
                  color: "yellow",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center"
                >
                  <item.icon
                    className={`mx-auto text-${item.color}-600 mb-4`}
                    size={40}
                  />
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-72 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-40">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="text-blue-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">All Categories</span>
                    </label>
                    {allCategories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category._id}
                          onChange={() => setSelectedCategory(category._id)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Price Range
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Minimum Rating
                  </h3>
                  <div className="space-y-2">
                    {[4.5, 4, 3].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="text-blue-600"
                        />
                        <span className="text-gray-700">{rating}★ & above</span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === 0}
                        onChange={() => setMinRating(0)}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">All Ratings</span>
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedCategory("all");
                    setMinRating(0);
                  }}
                  className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Clear All Filters
                </button>

                {/* Best Seller Badge */}
                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-blue-600" size={20} />
                    <span className="font-bold text-gray-800">
                      Customer Favorites
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    These products have consistently top ratings and reviews
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-700 font-medium">
                  <span className="text-blue-600 font-bold">
                    {bestSellers.length}
                  </span>{" "}
                  best selling products
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm">Sort:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="popular">Most Popular</option>
                        <option value="reviews">Most Reviewed</option>
                        <option value="rating">Highest Rated</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {bestSellers.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-6"
                  }
                >
                  {bestSellers.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
                  <Award size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No best sellers found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default BestSellersPage;
