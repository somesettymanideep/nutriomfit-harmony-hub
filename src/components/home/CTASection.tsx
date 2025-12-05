import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 leading-relaxed">
            Take the first step towards a healthier, happier you. Book a free consultation 
            and discover how our personalized programs can transform your life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <Link to="/contact" className="group">
                Start Your Wellness Journey
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/contact">
                <Phone size={20} />
                Book Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
