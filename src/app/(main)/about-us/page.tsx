import React from "react";
import AboutHeroSection from "@/views/AboutHeroSection";
import CompanyStorySection from "@/views/CompanyStorySection";
// import TeamSection from "@/views/TeamSection";
import ValuesSection from "@/views/ValuesSection";
import AboutCTASection from "@/views/AboutCTASection";
import InnovationRoadmapSection from "@/views/InnovationRoadmapSection";

const AboutUsPage = () => {
  return (
    <main className="overflow-hidden">
      <AboutHeroSection />
      <CompanyStorySection />
      <InnovationRoadmapSection />
      <ValuesSection />
      <AboutCTASection />
    </main>
  );
};

export default AboutUsPage;
