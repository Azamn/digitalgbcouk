import ClientMarquee from "@/components/_home/client-marquee";
import Cta from "@/components/_home/cta";
import Footer from "@/components/_home/footer";
import HelpSection from "@/components/_home/help";
import Hero from "@/components/_home/hero";
import Navbar from "@/components/_home/navbar";
import TestimonialsMarquee from "@/components/_home/testimonial-marquee";

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
