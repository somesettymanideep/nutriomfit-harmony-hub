import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FounderSection from "@/components/about/FounderSection";
import bannerImage from "@/assets/banner-about.jpg";
import {
  Leaf,
  Brain,
  Heart,
  Shield,
  Target,
  Sparkles,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const philosophyPoints = [
  {
    icon: Leaf,
    title: "Sustainable Changes Over Quick Fixes",
    description: "We focus on building habits that last a lifetime, not temporary solutions.",
  },
  {
    icon: Brain,
    title: "Science + Yoga Therapy",
    description: "Evidence-based methods combined with ancient yogic wisdom for holistic healing.",
  },
  {
    icon: Shield,
    title: "Personalized, Safe Programs",
    description: "Every program is tailored to your needs with safety as the top priority.",
  },
  {
    icon: Target,
    title: "Empowering Body Awareness",
    description: "Teaching you to understand and listen to your body for lifelong wellness.",
  },
];

const expertise = [
  "Training medical professionals",
  "Evidence-aware approach",
  "Yoga therapy expertise (IAYT method)",
  "Strength training specialization",
  "Nutrition science & gut health",
  "Safety-first wellness systems",
];

const differentiators = [
  {
    title: "Therapeutic Yoga (IAYT Method)",
    description: "Internationally recognized yoga therapy approach for healing and wellness.",
  },
  {
    title: "Muscle–Joint–Organ Awareness",
    description: "Deep understanding of body mechanics for safe, effective practice.",
  },
  {
    title: "Progressive Strength Training",
    description: "Scientifically structured resistance training for lasting results.",
  },
  {
    title: "Cognitive Plating Diet Method",
    description: "Revolutionary approach to mindful eating and nutrition.",
  },
  {
    title: "Kids Anatomy-Learning Yoga",
    description: "Fun, educational yoga that teaches children about their bodies.",
  },
  {
    title: "LSP Cleansing + Supervised Fasting",
    description: "Medical-grade gut reset protocols for deep cleansing.",
  },
];

const About = () => {
  return (
    <Layout>
      <PageBanner
        badge="About NUTRIOMFIT"
        title="Where Science, Tradition & Wellness"
        highlight="Unite"
        description="NUTRIOMFIT is more than a wellness brand—it's a movement towards holistic health. We blend the precision of modern science with the timeless wisdom of yoga therapy to create transformative experiences for every individual."
        icon={<Sparkles size={16} />}
        backgroundImage={bannerImage}
      />

      {/* Meet the Founder */}
      <FounderSection />

      {/* Brand Introduction */}
      {/* <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our{" "}
                <span className="text-gradient-primary">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  NUTRIOMFIT was born from a vision to make holistic wellness accessible to everyone. 
                  We recognized that true health isn't just about physical fitness—it encompasses 
                  mental clarity, emotional balance, and spiritual grounding.
                </p>
                <p>
                  Our approach integrates fitness training, therapeutic yoga, evidence-based nutrition 
                  science, and mindful practices into comprehensive programs. Whether you're a busy 
                  professional, a parent looking for your child's wellness, or someone seeking deep 
                  transformation, we have a path designed for you.
                </p>
                <p>
                  With a community that has collectively lost over 350+ kg and medical professionals 
                  among our clients, our results speak for themselves. But more importantly, it's 
                  the sustainable lifestyle changes and renewed sense of vitality our members 
                  experience that truly defines our success.
                </p>
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-card rounded-2xl border border-border text-center shadow-card">
                <div className="font-display text-4xl font-bold text-primary mb-2">400+</div>
                <p className="text-muted-foreground"> kgs collective weight loss</p>
              </div>
              <div className="p-8 bg-card rounded-2xl border border-border text-center shadow-card">
                <div className="font-display text-4xl font-bold text-primary mb-2">740+</div>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
              <div className="p-8 bg-card rounded-2xl border border-border text-center shadow-card">
                <div className="font-display text-4xl font-bold text-primary mb-2">7+</div>
                <p className="text-muted-foreground">years of experience</p>
              </div>
              <div className="p-8 bg-card rounded-2xl border border-border text-center shadow-card">
                <div className="font-display text-4xl font-bold text-primary mb-2">5+</div>
                <p className="text-muted-foreground">countries</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Philosophy Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our{" "}
              <span className="text-gradient-primary">Philosophy</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Guiding principles that shape every program and interaction at NUTRIOMFIT.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {philosophyPoints.map((point, index) => (
              <div
                key={point.title}
                className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <point.icon
                    size={28}
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                  />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our{" "}
                <span className="text-gradient-primary">Expertise</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our team brings together diverse expertise in wellness, ensuring you receive 
                the most comprehensive and effective guidance on your health journey.
              </p>
              <ul className="space-y-4">
                {expertise.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-3" />
              <div className="relative bg-card rounded-3xl p-8 border border-border shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                    <Award size={32} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground">
                      Trusted by Professionals
                    </h3>
                    <p className="text-muted-foreground">Medical & Healthcare Experts</p>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  Healthcare professionals trust our evidence-based approach. Our programs 
                  are designed with the same rigor expected in clinical settings, making them 
                  safe and effective for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Makes Us{" "}
              <span className="text-gradient-primary">Different</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our unique methodologies set us apart from conventional wellness programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card"
              >
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-gradient-to-br from-primary to-primary/80 rounded-3xl text-primary-foreground">
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                To create a world where holistic health is accessible to everyone—where people 
                are empowered with knowledge about their bodies, make sustainable lifestyle 
                choices, and live with vitality and purpose.
              </p>
            </div>

            <div className="p-10 bg-card rounded-3xl border border-border shadow-card">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Heart size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To guide individuals on transformative wellness journeys through evidence-based 
                programs that integrate yoga therapy, strength training, mindful nutrition, and 
                mental well-being—creating lasting positive change in their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Take the first step on your wellness journey. Book a free consultation and 
            discover which program is right for you.
          </p>
          <Button variant="cta" size="xl" asChild>
            <Link to="/contact" className="group">
              Start Your Journey
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
