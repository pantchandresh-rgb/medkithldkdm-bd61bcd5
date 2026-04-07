import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import DoctorsSection from "@/components/DoctorsSection";
import ElderlyCareSection from "@/components/ElderlyCareSection";
import WhyBookCalcSection from "@/components/WhyBookCalcSection";
import EmotionalBanners from "@/components/EmotionalBanners";
import PartnerSection from "@/components/PartnerSection";
import AreasSection from "@/components/AreasSection";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <DoctorsSection />
    <ElderlyCareSection />
    <WhyBookCalcSection />
    <EmotionalBanners />
    <PartnerSection />
    <AreasSection />
    <Footer />
    <FloatingButtons />
  </div>
);

export default Index;
