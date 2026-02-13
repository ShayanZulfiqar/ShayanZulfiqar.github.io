"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fetchProductCategories, fetchProductSubCategories, fetchProducts } from "@/store/slices/shopSlice";
import { SubCategory, Category, Product, ProductFilterParams } from "@/types/shop";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductFilterSidebar from "@/components/shop/ProductFilterSidebar";
import ShopHeader from "@/elements/ShopHeader";

const ShopSubCategoryPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const subCategorySlug = params.subcategory as string;
  const categorySlug = params.category as string;

  const { data: subCategories } = useAppSelector((state) => state.shop.subCategories);
  const { data: products, loading } = useAppSelector((state) => state.shop.products);
  const [subCategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchProductCategories());
    dispatch(fetchProductSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!subCategorySlug || subCategories.length === 0) return;

    const matchedSub = subCategories.find(s => {
      const apiSlug = s.slug.toLowerCase().replace(/^\//, '');
      const paramSlug = subCategorySlug.toLowerCase();
      return apiSlug === paramSlug;
    });

    if (matchedSub) {
      setSubCategoryName(matchedSub.name);

      const filterParams: ProductFilterParams = {
        subCategory: matchedSub._id,
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
  }, [subCategorySlug, subCategories, searchParams, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      <div className="pt-8 pb-12 mt-40 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 capitalize">
            {subCategoryName || subCategorySlug?.replace(/-/g, " ")}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
            <span className="capitalize">{categorySlug?.replace(/-/g, " ")}</span>
            <span>/</span>
            <span className="capitalize font-medium text-gray-700">{subCategoryName || subCategorySlug?.replace(/-/g, " ")}</span>
          </div>
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
      </div>
    </div>
  );
};

export default ShopSubCategoryPage;
