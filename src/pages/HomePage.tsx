import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { MarqueeBrands } from "../components/sections/MarqueeBrands";
import { StatsCounter } from "../components/sections/StatsCounter";
import { HowItWorks } from "../components/sections/HowItWorks";
import { FleetPreview } from "../components/sections/FleetPreview";
import { WhyUs } from "../components/sections/WhyUs";
import { ReviewsSlider } from "../components/sections/ReviewsSlider";
import { LocationsMap } from "../components/sections/LocationsMap";
import { FaqSection } from "../components/sections/FaqSection";
import { NewsSection } from "../components/sections/NewsSection";
import { PartnershipCta } from "../components/sections/PartnershipCta";
import { ContactForm } from "../components/sections/ContactForm";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { ScrollProgressBar } from "../components/common/ScrollProgressBar";
import { CarDetailModal } from "../components/car/CarDetailModal";

export default function HomePage() {
  const [detailCarId, setDetailCarId] = useState<number | null>(null);
  const { hash } = useLocation();

  // When navigating here from another page with a hash (e.g. /#reviews),
  // scroll to the target section after it mounts.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <MarqueeBrands />
        <StatsCounter />
        <HowItWorks />
        <FleetPreview onDetail={setDetailCarId} />
        <WhyUs />
        <ReviewsSlider />
        <LocationsMap />
        <FaqSection />
        <NewsSection />
        <PartnershipCta />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
      <CarDetailModal carId={detailCarId} onClose={() => setDetailCarId(null)} />
    </>
  );
}
