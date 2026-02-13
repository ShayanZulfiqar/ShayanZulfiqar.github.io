"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fetchProductCategories, fetchProducts } from "@/store/slices/shopSlice";
import { Category, Product, ProductFilterParams } from "@/types/shop";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductFilterSidebar from "@/components/shop/ProductFilterSidebar";
import ShopHeader from "@/elements/ShopHeader";
import ShopFAQSection from "@/components/shop/ShopFAQSection";

const ShopCategoryPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const categorySlug = params.category as string; // from URL

  const { data: categories } = useAppSelector((state) => state.shop.categories);
  const { data: products, loading } = useAppSelector((state) => state.shop.products);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!categorySlug || categories.length === 0) return;

    const matchedCat = categories.find(c => {
      const apiSlug = c.slug.toLowerCase().replace(/^\//, '');
      const paramSlug = categorySlug.toLowerCase();
      return apiSlug === paramSlug;
    });

    if (matchedCat) {
      setCategoryName(matchedCat.name);
      const filterParams: ProductFilterParams = {
        category: matchedCat._id,
        minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
        maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
        minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
        brand: searchParams.get("brand") || undefined,
        inStock: searchParams.get("inStock") === "true" || undefined,
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
        limit: 12,
        isActive: true
      };
      dispatch(fetchProducts(filterParams));
    }
  }, [categorySlug, categories, searchParams, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />
      <div className="pt-8 pb-12 mt-40 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 capitalize">
            {categoryName || categorySlug?.replace(/-/g, " ")}
          </h1>
          <p className="mt-2 text-gray-500">
            Explore our collection of {categoryName}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <ProductFilterSidebar />
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            <ProductGrid products={products} loading={loading} />
          </main>
        </div>

        {/* FAQ Section */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8 mt-20">
          <ShopFAQSection />
        </div>
      </div>
    </div>
  );
};

export default ShopCategoryPage;
