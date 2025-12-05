import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Apple, 
  Baby, 
  Droplets, 
  ArrowRight,
  CheckCircle2 
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Women Wellness Program",
    description: "Comprehensive wellness combining therapeutic yoga, strength training, and hormonal balance support.",
    features: ["Therapeutic Yoga (IAYT)", "Core Strengthening", "Pranayama & Meditation", "Hormonal Balance"],
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-rose-500",
  },
  {
    icon: Apple,
    title: "90-Day Diet Program",
    description: "Scientifically designed nutrition plan using the Cognitive Plating Method for sustainable weight management.",
    features: ["Personalized Diet Plans", "Cognitive Plating Method", "21-Day Cycles", "Lifestyle Transformation"],
    color: "from-primary/20 to-emerald-500/20",
    iconColor: "text-primary",
  },
  {
    icon: Baby,
    title: "Kids Yoga (Ages 7-14)",
    description: "Fun and educational yoga program teaching children anatomy, mindfulness, and emotional balance.",
    features: ["Anatomy-Based Learning", "Yogic Chants & Mantras", "Practice Merit Points", "Emotional Development"],
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: Droplets,
    title: "LSP + Juice Fasting",
    description: "4-day supervised gut reset program for digestive health and body rejuvenation.",
    features: ["Laghu Shankha Prakshalana", "Monitored Juice Fasting", "Medical Review Required", "Gut Reset & Rejuvenation"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Our Programs
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Transformative Wellness{" "}
            <span className="text-gradient-primary">Programs</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our range of holistic programs designed to nurture your body, 
            calm your mind, and elevate your overall well-being.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative p-8">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                >
                  <service.icon size={28} className={service.iconColor} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 size={16} className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="cta" size="xl" asChild>
            <Link to="/services">
              View All Programs
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
