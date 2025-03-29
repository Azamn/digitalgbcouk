import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import Cta from "./cta";
import HelpSection from "./help";
import TestimonialsMarquee from "./testimonial-marquee";
import Footer from "./footer";
import ClientMarquee from "./client-marquee";

function HomePage() {
 
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Cta />
      <HelpSection />
      <ClientMarquee />
      <TestimonialsMarquee />
      <Footer />
    </div>
  );
}

export default HomePage;
