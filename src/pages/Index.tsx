import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import ServicesSection from "@/components/ServicesSection";
import DoctorAmbulanceUSP from "@/components/DoctorAmbulanceUSP";
import DoctorsSection from "@/components/DoctorsSection";
import ElderlyCareSection from "@/components/ElderlyCareSection";
import WhyBookCalcSection from "@/components/WhyBookCalcSection";
import EmotionalBanners from "@/components/EmotionalBanners";
import AreasSection from "@/components/AreasSection";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustSignals />
    <ServicesSection />
    <DoctorAmbulanceUSP />
    <DoctorsSection />
    <ElderlyCareSection />
    <WhyBookCalcSection />
    <EmotionalBanners />
    <AreasSection />
    <Footer />
    <FloatingButtons />
  </div>
);

export default Index;
