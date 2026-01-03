import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  Apple,
  Baby,
  Droplets,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  AlertCircle,
  Calendar,
  Trophy,
} from "lucide-react";

const services = [
  {
    id: "women-wellness",
    icon: Heart,
    title: "Women Wellness Program",
    subtitle: "Holistic Health for Modern Women",
    description: "A comprehensive wellness program designed specifically for women, combining therapeutic yoga with progressive strength training to achieve hormonal balance, build strength, and cultivate mental clarity.",
    features: [
      "Therapeutic yoga following IAYT approach",
      "Theme-based sessions: spine health, pelvic wellness, stress release, diabetes yoga",
      "Netra Yoga (eye exercises) & Mukha Yoga (facial yoga)",
      "Pranayama and meditation practices",
      "Core strengthening with dumbbells and progressive overload",
      "Personalized guidance and tracking",
    ],
    benefits: [
      "Improved hormonal balance",
      "Increased strength and flexibility",
      "Better stress management",
      "Enhanced emotional clarity",
      "Greater body awareness",
      "Sustainable lifestyle habits",
    ],
    whoIsFor: "Women of all ages seeking holistic wellness, hormonal balance, and strength building in a supportive, understanding environment.",
    duration: "Ongoing monthly program",
    color: "from-pink-500/20 to-rose-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    id: "diet-program",
    icon: Apple,
    title: "90-Day Diet Program",
    subtitle: "The 111-Day Transformation Model",
    description: "A scientifically designed nutrition program using the innovative Cognitive Plating Method. Transform your relationship with food through 4 structured cycles, leading to sustainable weight management and lifelong healthy eating habits.",
    features: [
      "Personalized diet based on metabolic profile",
      "Cognitive Plating Method for mindful eating",
      "4 cycles of 21 days each with refeed days",
      "21-day post-program maintenance phase",
      "Regular check-ins and adjustments",
      "Educational nutrition guidance",
    ],
    benefits: [
      "Sustainable weight loss",
      "Improved metabolic health",
      "Better understanding of nutrition",
      "Reduced food cravings",
      "Improved energy levels",
      "Lifelong healthy eating patterns",
    ],
    whoIsFor: "Anyone seeking lasting weight management through science-based nutrition, not crash diets. Perfect for those ready to commit to real change.",
    duration: "111 days (90-day program + 21-day maintenance)",
    stats: "350+ kg community weight loss achieved",
    color: "from-primary/20 to-emerald-500/20",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "kids-yoga",
    icon: Baby,
    title: "Kids Yoga",
    subtitle: "Ages 7-14: Learn, Play, Grow",
    description: "A fun, educational yoga program that teaches children about their bodies through anatomy-based learning. Kids develop physical strength, emotional balance, and mindfulness skills while enjoying engaging practices.",
    features: [
      "Anatomy-based yoga learning",
      "Yogic chants, mantras, and cultural education",
      "Netra Yoga (eye exercises) & Mukha Yoga",
      "Age-appropriate pranayama techniques",
      "Practice Merit Points reward system",
      "\"Balayogi of the Month\" recognition",
    ],
    benefits: [
      "Improved physical coordination",
      "Better focus and concentration",
      "Emotional regulation skills",
      "Understanding of body anatomy",
      "Discipline and self-awareness",
      "Fun, healthy social interaction",
    ],
    whoIsFor: "Children aged 7-14 who want to learn yoga in a fun, engaging way. Parents who value holistic education and want their kids to develop healthy habits early.",
    duration: "Ongoing weekly sessions",
    color: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    id: "gut-reset",
    icon: Droplets,
    title: "LSP + Juice Fasting",
    subtitle: "4-Day Gut Reset Program",
    description: "A supervised gut cleansing protocol combining Laghu Shankha Prakshalana with monitored juice fasting. This intensive program is designed for digestive reset and body rejuvenation under careful professional guidance.",
    features: [
      "Day 1: Laghu Shankha Prakshalana cleansing",
      "Days 2-4: Monitored juice fasting",
      "Pre-program medical review required",
      "Daily check-ins and guidance",
      "Post-program diet recommendations",
      "Educational materials on gut health",
    ],
    benefits: [
      "Complete digestive reset",
      "Gut rest and rejuvenation",
      "Toxin elimination",
      "Improved digestion long-term",
      "Mental clarity",
      "Reset eating patterns",
    ],
    whoIsFor: "Adults seeking deep digestive cleansing who are medically cleared. Not suitable for everyone—medical review determines eligibility.",
    duration: "4 days",
    important: "This program requires medical review for eligibility. It is not a replacement for medical treatment. All participants must meet safety criteria.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
];

const Services = () => {
  return (
    <Layout>
      <PageBanner
        badge="Our Programs"
        title="Transformative Wellness"
        highlight="Programs"
        description="Discover our range of holistic programs designed to nurture your body, calm your mind, and elevate your overall well-being. Each program is crafted with science, tradition, and personalized care."
        icon={<Sparkles size={16} />}
      />

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-background" : "bg-secondary/30"}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                <div className={`w-20 h-20 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
                  <service.icon size={40} className={service.iconColor} />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg">{service.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-foreground/80 text-lg leading-relaxed mb-12 max-w-4xl">
                {service.description}
              </p>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Features */}
                <div className="p-8 bg-card rounded-2xl border border-border shadow-card">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" size={24} />
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="p-8 bg-card rounded-2xl border border-border shadow-card">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                    <Trophy className="text-primary" size={24} />
                    Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <Sparkles size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Who It's For */}
                <div className="p-6 bg-accent/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={20} className="text-primary" />
                    <span className="font-display font-semibold text-foreground">Who It's For</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.whoIsFor}</p>
                </div>

                {/* Duration */}
                <div className="p-6 bg-accent/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={20} className="text-primary" />
                    <span className="font-display font-semibold text-foreground">Duration</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.duration}</p>
                </div>

                {/* Stats or CTA */}
                <div className="p-6 bg-primary/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={20} className="text-primary" />
                    <span className="font-display font-semibold text-foreground">Get Started</span>
                  </div>
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <Link to="/contact">Book Consultation</Link>
                  </Button>
                </div>
              </div>

              {/* Important Notice */}
              {service.important && (
                <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-4">
                  <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">Important Safety Information</h4>
                    <p className="text-foreground/80 text-sm">{service.important}</p>
                  </div>
                </div>
              )}

              {/* Stats Badge */}
              {service.stats && (
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Trophy size={18} className="text-primary" />
                  <span className="text-primary font-medium">{service.stats}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Not Sure Which Program is Right for You?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Book a free consultation and let us help you find the perfect wellness 
              program tailored to your unique needs and goals.
            </p>
            <Button
              variant="secondary"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-lg"
              asChild
            >
              <Link to="/contact" className="group">
                Book Free Consultation
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
