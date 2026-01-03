import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bannerImage from "@/assets/banner-programs.jpg";
import {
  Heart,
  Utensils,
  Baby,
  Leaf,
  ArrowRight,
  Clock,
  Users,
  Target,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const programs = [
  {
    id: "women-wellness",
    title: "Women Wellness Program",
    subtitle: "A Holistic Wellness Journey Curated Exclusively for Women",
    description:
      "A thoughtfully designed blend of therapeutic yoga and progressive core strength training, crafted to support a woman's body, mind and overall hormonal health.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    features: [
      "Therapeutic Yoga with IAYT approach",
      "Theme-based sessions: spine health, pelvic wellness",
      "Pranayama, Netra Yoga & Mukha Yoga",
      "Progressive strength training with dumbbells",
      "HIIT & focused abdominal workouts",
    ],
    benefits: [
      "Hormonal balance & emotional clarity",
      "Improved flexibility & strength",
      "Stress relief & diabetes management",
      "Full body conditioning",
    ],
    duration: "Ongoing Program",
    ideal: "Women of all fitness levels",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
  },
  {
    id: "diet-program",
    title: "90-Day Diet Program",
    subtitle: "111 Days of Mindful Eating & Metabolic Reset",
    description:
      "A personalized, science-backed nutritional journey crafted by a certified health coach. Ideal for sustainable weight loss, improved metabolic health, and mindful eating habits.",
    icon: Utensils,
    color: "from-primary to-emerald-500",
    bgColor: "bg-primary/5",
    features: [
      "Personalized diet based on metabolic profile",
      "Cognitive Plating Method",
      "Ekavimshati Model – 4 phases of 21 days",
      "Refeed days for metabolic support",
      "21 days post-program maintenance",
    ],
    benefits: [
      "400+  kg community weight loss achieved",
      "No extreme restrictions",
      "Balanced macronutrient intake",
      "Long-term lifestyle transformation",
    ],
    duration: "111 Days (90 + 21 maintenance)",
    ideal: "Anyone seeking sustainable weight loss",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
  },
  {
    id: "kids-yoga",
    title: "Kids Yoga",
    subtitle: "Where Learning Meets Movement & Curiosity Meets Calm",
    description:
      "Designed to help children understand their bodies, emotions and physical abilities in an engaging, educational and enjoyable way with anatomy-based learning.",
    icon: Baby,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    features: [
      "Anatomy-based yoga learning",
      "Yogic chants & mantras",
      "Pranayama for emotional regulation",
      "Netra Yoga & Mukha Yoga",
      "Practice Merit Points system",
    ],
    benefits: [
      "Builds curiosity & body awareness",
      "Emotional balance & discipline",
      "Flexibility & strength development",
      "Balayogi of the Month recognition",
    ],
    duration: "Ongoing Classes",
    ideal: "Children ages 7-14",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600",
  },
  {
    id: "gut-reset",
    title: "LSP + Juice Fasting",
    subtitle: "A Powerful 4-Day Gut Reset & Detox Experience",
    description:
      "Combines ancient yogic detox practices with modern nutritional science to help reset and refresh the digestive system through Laghu Shankha Prakshalana and monitored juice fasting.",
    icon: Leaf,
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50",
    features: [
      "Day 1: Laghu Shankha Prakshalana",
      "Days 2-4: Personalized juice fasting",
      "Medical eligibility screening",
      "Daily fatigue & symptom tracking",
      "Dedicated support group",
    ],
    benefits: [
      "Deep digestive rest",
      "Gut reset & metabolic cleansing",
      "Rejuvenation & healing",
      "Transformative experience",
    ],
    duration: "4 Days",
    ideal: "Adults with medical clearance",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600",
  },
];

const comingSoon = {
  title: "Guided Meditation Programs",
  subtitle: "Coming Soon",
  description:
    "A series of meditation practices designed to support stress relief, emotional balance, mental clarity, inner awareness and overall wellbeing.",
  features: [
    "Multiple meditation styles",
    "Beginner to advanced levels",
    "Stress relief focused",
    "Inner awareness development",
  ],
};

const Programs = () => {
  return (
    <Layout>
      <PageBanner
        badge="Our Programs"
        title="Transform Your Life with Our"
        highlight="Signature Programs"
        description="Holistic wellness programs blending therapeutic yoga, strength training, mindful nutrition & cleansing practices for lasting transformation."
        icon={<Sparkles size={16} />}
        backgroundImage={bannerImage}
      />

      {/* Programs Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Side */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${program.color} rounded-3xl transform rotate-3 opacity-20`}
                    />
                    <img
                      src={program.image}
                      alt={program.title}
                      className="relative rounded-3xl shadow-xl w-full h-[400px] object-cover"
                    />
                    <div
                      className={`absolute -bottom-6 ${
                        index % 2 === 1 ? "-left-6" : "-right-6"
                      } w-24 h-24 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <program.icon size={40} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <p className="text-primary font-medium mb-2">
                        {program.subtitle}
                      </p>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                        {program.title}
                      </h2>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {program.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                        <Clock size={16} className="text-primary" />
                        <span className="text-sm font-medium">
                          {program.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                        <Users size={16} className="text-primary" />
                        <span className="text-sm font-medium">
                          {program.ideal}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {program.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle
                            size={18}
                            className="text-primary mt-0.5 flex-shrink-0"
                          />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className={`p-4 rounded-xl ${program.bgColor}`}>
                      <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Target size={18} className="text-primary" />
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {program.benefits.map((benefit) => (
                          <span
                            key={benefit}
                            className="text-sm text-muted-foreground"
                          >
                            • {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="cta" size="lg" asChild>
                      <Link to="/contact">
                        Enroll Now
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {comingSoon.subtitle}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {comingSoon.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {comingSoon.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {comingSoon.features.map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            Book a free consultation to discuss your goals and find the perfect
            program for your wellness journey.
          </p>
          <Button variant="cta" size="xl" asChild>
            <Link to="/contact">
              Book Free Consultation
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
