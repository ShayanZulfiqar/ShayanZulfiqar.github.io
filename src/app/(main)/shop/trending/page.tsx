"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ProductCard from "@/components/shop/ProductCard";
import { ShopTrending, Product, Category } from "@/types/shop";
import {
  TrendingUp,
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronDown,
  Flame,
  Loader2,
} from "lucide-react";

import { fetchTrendingProducts, fetchProductCategories, fetchProducts } from "@/store/slices/shopSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const TrendingPage = () => {
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: trendingRecords, loading: heroLoading } = useAppSelector((state) => state.shop.trending);
  const { data: allCategories } = useAppSelector((state) => state.shop.categories);
  const { data: products, loading } = useAppSelector((state) => state.shop.products);

  const trendingData = trendingRecords && trendingRecords.length > 0 ? trendingRecords[0] : null;

  useEffect(() => {
    dispatch(fetchTrendingProducts());
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    const params: any = {
      isTrending: true,
      limit: 100,
      maxPrice: priceRange[1],
      sort: sortBy
    };
    if (selectedCategory !== "all") {
      params.category = selectedCategory;
    }
    dispatch(fetchProducts(params));
  }, [dispatch, priceRange, selectedCategory, sortBy]);

  const trendingProducts = products;

  // Get all trending products
  // let trendingProducts = products.filter((p) => p.trending); // This line is now redundant as products state is already filtered by API

  // Apply filters - now handled by API call in useEffect
  // trendingProducts = trendingProducts.filter(
  //   (p) =>
  //     p.price >= priceRange[0] &&
  //     p.price <= priceRange[1] &&
  //     (selectedCategory === "all" || p.category === selectedCategory)
  // );

  // Sort products - now handled by API call in useEffect
  // switch (sortBy) {
  //   case "price-low":
  //     trendingProducts.sort((a, b) => a.price - b.price);
  //     break;
  //   case "price-high":
  //     trendingProducts.sort((a, b) => b.price - a.price);
  //     break;
  //   case "rating":
  //     trendingProducts.sort((a, b) => b.rating - a.rating);
  //     break;
  // }

  // const uniqueCategories = Array.from(
  //   new Set(products.filter((p) => p.trending).map((p) => p.category))
  // ); // This is now replaced by allCategories state

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader categories={allCategories} />

      <main className="pt-40 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-20 overflow-hidden min-h-[400px] flex items-center">
          <div className="absolute inset-0 bg-black/10" />
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            {heroLoading ? (
              <div className="flex flex-col items-center justify-center text-white gap-4">
                <Loader2 className="animate-spin" size={48} />
                <p className="text-xl font-medium">Crunching trending data...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Flame className="text-white" size={48} />
                  <TrendingUp className="text-white" size={48} />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  {trendingData?.title || "Trending Products"}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  {trendingData?.description || "Discover the hottest products that everyone is talking about. Stay ahead of the curve with our trending collection."}
                </p>
                <div className="flex items-center justify-center gap-6 text-white">
                  <div>
                    <div className="text-3xl font-bold">
                      {trendingData?.productsNumber || trendingProducts.length}+
                    </div>
                    <div className="text-white/80">Products</div>
                  </div>
                  <div className="w-px h-12 bg-white/30" />
                  <div>
                    <div className="text-3xl font-bold">{trendingData?.ratingNumber || "4.8"}★</div>
                    <div className="text-white/80">Avg Rating</div>
                  </div>
                  <div className="w-px h-12 bg-white/30" />
                  <div>
                    <div className="text-3xl font-bold">{trendingData?.reviewNumber || "15K"}+</div>
                    <div className="text-white/80">Reviews</div>
                  </div>
                </div>
              </motion.div>
            )}
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
                  <SlidersHorizontal className="text-purple-600" size={24} />
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
                        className="text-purple-600 focus:ring-purple-500"
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
                          className="text-purple-600 focus:ring-purple-500"
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
                    className="w-full accent-purple-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedCategory("all");
                  }}
                  className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                >
                  Clear All Filters
                </button>

                {/* Trending Badge */}
                <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="text-orange-600" size={20} />
                    <span className="font-bold text-gray-800">
                      Hot Right Now!
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    These products are flying off the shelves. Don't miss out!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-700 font-medium">
                  <span className="text-purple-600 font-bold">
                    {trendingProducts.length}
                  </span>{" "}
                  trending products found
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm">Sort:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
                      >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
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
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {trendingProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-6"
                  }
                >
                  {trendingProducts.map((product, index) => (
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
                  <TrendingUp
                    size={64}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No trending products found
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

export default TrendingPage;
