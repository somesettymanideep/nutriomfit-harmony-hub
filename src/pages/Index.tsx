import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import VideoSliderSection from "@/components/home/VideoSliderSection";
import FAQSection from "@/components/home/FAQSection";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutPreview />
      <ServicesOverview />
      <WhyChooseUs />
      <VideoSliderSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
