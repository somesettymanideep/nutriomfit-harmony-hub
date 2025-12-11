import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import VideoTestimonials from "@/components/home/VideoTestimonials";
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
      <VideoTestimonials />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
