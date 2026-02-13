"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ShopHeader from "@/elements/ShopHeader";
import ShopHero from "@/components/shop/ShopHero";
import ShopByCategorySection from "@/components/shop/ShopByCategorySection";
import ShopFAQSection from "@/components/shop/ShopFAQSection";
import { Category, Product, ProductFilterParams } from "@/types/shop";
import SubCategoryShowcase from "@/components/shop/SubCategoryShowcase";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductFilterSidebar from "@/components/shop/ProductFilterSidebar";

import { fetchProductCategories, fetchProducts } from "@/store/slices/shopSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ShopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { data: categories } = useAppSelector((state) => state.shop.categories);
  const { data: products, loading } = useAppSelector((state) => state.shop.products);
  // Assuming the API returns products directly in 'data' for getProducts
  // or we need to handle the totalProducts count. 
  // Let's check how we handle totalProducts in ShopPage.
  const [totalProducts, setTotalProducts] = useState(0);

  // Derived filter state from URL
  const filters: ProductFilterParams = {
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    brand: searchParams.get("brand") || undefined,
    inStock: searchParams.get("inStock") === "true" || undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: 12,
    isActive: true
  };

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, searchParams]); // searchParams dependency covers filter changes

  // We need a way to get totalProducts from Redux if it's paginated.
  // My shopSlice currently returns action.payload.products || action.payload.
  // I should probably update shopSlice to store meta information if available.
  // But for now, let's just make it work with what we have.
  useEffect(() => {
    if (products) {
      setTotalProducts(products.length); // Fallback if no total count
    }
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <ShopHeader categories={categories} />

      <main className="pt-20 md:pt-28">
        {/* Banner Section */}
        <div className="mb-0">
          <ShopHero />
        </div>

        {/* Global Store Container */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Categorization Strip */}
          <div className="mb-8">
            <ShopByCategorySection categories={categories} />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Sidebar - Filters */}
            <aside className="lg:w-1/4 xl:w-1/5 shrink-0">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <h2 className="font-bold text-lg">Store Filters</h2>
                    <p className="text-xs opacity-80">Refine your search</p>
                  </div>
                  <ProductFilterSidebar className="!border-none !shadow-none !p-5" />
                </div>

                {/* Promotional Card in Sidebar */}
                <div className="mt-6 bg-purple-900 rounded-2xl p-6 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-2">Member Exclusive</h3>
                    <p className="text-sm text-purple-200 mb-4">Get extra 15% off on your first order!</p>
                    <button className="bg-white text-purple-900 px-4 py-2 rounded-lg font-bold text-xs hover:bg-purple-50 transition-colors">
                      Join Rewards
                    </button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>
              </div>
            </aside>

            {/* Right Side - Product Listing */}
            <div className="flex-1">
              {/* Product Controls Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Explore Collection</h1>
                  <p className="text-sm text-gray-500">Showing {products.length} {products.length === 1 ? 'product' : 'products'}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-gray-700 mr-2 hidden sm:block">Sort By:</div>
                  <select className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-purple-500 focus:border-purple-500 block p-2.5 outline-none">
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Best Rating</option>
                  </select>
                </div>
              </div>



              {/* Unified Product Grid */}
              <div className="min-h-[600px]">
                <ProductGrid products={products} loading={loading} />
              </div>

              {/* Pagination (Simplified) */}
              {!loading && products.length > 0 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <button
                    disabled={filters.page === 1}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("page", String((filters.page || 1) - 1));
                      router.push(`?${params.toString()}`);
                    }}
                    className="px-6 py-2 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-white hover:border-purple-600 hover:text-purple-600 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    {[...Array(Math.ceil(totalProducts / 12))].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set("page", String(i + 1));
                          router.push(`?${params.toString()}`);
                        }}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${filters.page === i + 1 ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-purple-50'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={products.length < 12}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("page", String((filters.page || 1) + 1));
                      router.push(`?${params.toString()}`);
                    }}
                    className="px-6 py-2 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-white hover:border-purple-600 hover:text-purple-600 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Items Strip - Optional but good for UI juice */}
        <SubCategoryShowcase />

        {/* FAQ Section */}
        <ShopFAQSection />
      </main>
    </div>
  );
};

export default ShopPage;
