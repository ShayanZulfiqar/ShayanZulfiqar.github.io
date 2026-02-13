import React from "react";
import TestimonialsHeroSection from "@/views/TestimonialsHeroSection";
import TextTestimonialsSection from "@/views/TextTestimonialsSection";
import VideoTestimonialsSection from "@/views/VideoTestimonialsSection";
import ClientLogosSection from "@/views/ClientLogosSection";
import TestimonialsCTASection from "@/views/TestimonialsCTASection";

const TestimonialsPage = () => {
  return (
    <main className="overflow-hidden">
      <TestimonialsHeroSection />
      <TextTestimonialsSection />
      <VideoTestimonialsSection />
      <ClientLogosSection />
      <TestimonialsCTASection />
    </main>
  );
};

export default TestimonialsPage;
