import React from "react";
import ProductsHeroSection from "@/views/ProductsHeroSection";
import FeaturedProductsSection from "@/views/FeaturedProductsSection";
import ProductCategoriesSection from "@/views/ProductCategoriesSection";
import PricingSection from "@/views/PricingSection";
import ProductsCTASection from "@/views/ProductsCTASection";

const ProductsPage = () => {
  return (
    <main className="overflow-hidden">
      <ProductsHeroSection />
      <FeaturedProductsSection />
      <ProductCategoriesSection />
      <PricingSection />
      <ProductsCTASection />
    </main>
  );
};

export default ProductsPage;
