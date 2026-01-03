import { 
  Dumbbell, 
  Apple, 
  Baby, 
  Shield, 
  Scale, 
  Stethoscope,
  Sparkles
} from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: "Yoga Therapy + Strength Training",
    description: "A unique blend combining therapeutic yoga with progressive strength training for complete body transformation.",
  },
  {
    icon: Apple,
    title: "Evidence-Based Nutrition",
    description: "Personalized diet plans backed by scientific research and the innovative Cognitive Plating Method.",
  },
  {
    icon: Baby,
    title: "Anatomy-Based Kids Yoga",
    description: "Specialized programs teaching children about their bodies through fun, engaging yoga practices.",
  },
  {
    icon: Shield,
    title: "Safety-First Approach",
    description: "All programs designed with safety as priority, including medical reviews where necessary.",
  },
  {
    icon: Scale,
    title: "400+ kg Community Weight Loss",
    description: "Proven track record with our community achieving remarkable, sustainable weight loss results.",
  },
  {
    icon: Stethoscope,
    title: "Medical Professional Clients",
    description: "Trusted by healthcare professionals who understand and value our evidence-based approach.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Why NUTRIOMFIT
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            What Makes Us{" "}
            <span className="text-gradient-primary">Different</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our unique approach combines ancient wisdom with modern science, 
            creating wellness programs that truly transform lives.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              {/* Decorative Line */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                <reason.icon
                  size={24}
                  className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
