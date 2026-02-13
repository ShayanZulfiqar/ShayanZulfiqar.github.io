import React from "react";
import VisionHeroSection from "@/views/VisionHeroSection";
import FutureGoalsSection from "@/views/FutureGoalsSection";
import InnovationRoadmapSection from "@/views/InnovationRoadmapSection";
import SustainabilityCommitmentSection from "@/views/SustainabilityCommitmentSection";
import VisionCTASection from "@/views/VisionCTASection";

const VisionPage = () => {
  return (
    <main className="overflow-hidden">
      <VisionHeroSection />
      <FutureGoalsSection />
      <InnovationRoadmapSection />
      <SustainabilityCommitmentSection />
      <VisionCTASection />
    </main>
  );
};

export default VisionPage;
