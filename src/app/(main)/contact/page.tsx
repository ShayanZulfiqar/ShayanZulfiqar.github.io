import React from "react";
import ContactHeroSection from "@/views/ContactHeroSection";
import ContactFormSection from "@/views/ContactFormSection";
import ContactLocationSection from "@/views/ContactLocationSection";


const ContactPage = () => {
  return (
    <main className="overflow-hidden">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactLocationSection />
    </main>
  );
};

export default ContactPage;
