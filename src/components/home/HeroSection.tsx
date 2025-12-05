import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Wellness journey"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-8 animate-fade-up">
            <Sparkles size={16} className="text-primary" />
            <span className="text-primary-foreground text-sm font-medium">
              Holistic Wellness Programs
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
            Where Science, Tradition &{" "}
            <span className="text-gradient-primary">Wellness</span> Meet
          </h1>

          {/* Subtext */}
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 animate-fade-up animation-delay-200">
            Transform your body, nourish your mind, reset your health. 
            Experience therapeutic yoga, strength training, mindful nutrition, 
            and gut reset programs designed for lasting change.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-3 mb-10 animate-fade-up animation-delay-300">
            {["Therapeutic Yoga", "Strength Training", "Mindful Nutrition", "Gut Reset"].map(
              (item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm border border-primary-foreground/20"
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-400">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                Start Your Journey
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/services">Explore Programs</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-up animation-delay-500">
            <div>
              <p className="font-display text-3xl font-bold text-primary">350+</p>
              <p className="text-primary-foreground/70 text-sm">kg Community Weight Loss</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary">500+</p>
              <p className="text-primary-foreground/70 text-sm">Happy Members</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary">4+</p>
              <p className="text-primary-foreground/70 text-sm">Wellness Programs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
