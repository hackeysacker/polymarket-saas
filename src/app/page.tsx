import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Curriculum from "@/components/landing/Curriculum";
import SimulatorPreview from "@/components/landing/SimulatorPreview";
import PricingSection from "@/components/landing/PricingSection";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Curriculum />
        <SimulatorPreview />
        <PricingSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
