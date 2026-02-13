"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/views/HeroSection";
import ServicesSection from "@/views/ServicesSection";
import AboutPreviewSection from "@/views/AboutPreviewSection";
import PortfolioSection from "@/views/PortfolioSection";
import TestimonialsSection from "@/views/TestimonialsSection";
import WhyChooseUsSection from "@/views/WhyChooseUsSection";
import CallToActionSection from "@/views/CallToActionSection";
import SubCategoryShowcase from "@/components/shop/SubCategoryShowcase";
import { motion } from "framer-motion";
import { HeroParallaxDemo } from "@/views/HeroParallaxDemo";

const HomePage = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
      } catch (error) {
        console.error("Failed to fetch home shop data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShopData();
  }, []);

  return (
    <main className="overflow-hidden">
      <HeroParallaxDemo />
      <ServicesSection />
      <AboutPreviewSection />
      <PortfolioSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <CallToActionSection />
    </main>
  );
};

export default HomePage;
