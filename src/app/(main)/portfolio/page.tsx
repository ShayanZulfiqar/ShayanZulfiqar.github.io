import React from "react";
import PortfolioHeroSection from "@/views/PortfolioHeroSection";
import ProcessSection from "@/views/ProcessSection";
import PortfolioSection from "@/views/PortfolioSection";
import PortfolioCTASection from "@/views/PortfolioCTASection";


const PortfolioPage = () => {
  return (
    <main className="overflow-hidden">
      <PortfolioHeroSection />
      <PortfolioSection />
      <ProcessSection />
      <PortfolioCTASection />
    </main>
  );
};

export default PortfolioPage;
