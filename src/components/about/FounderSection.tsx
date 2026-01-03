import { Award, CheckCircle2, Globe, Users, Target, Heart } from "lucide-react";

const specializations = [
  "Women's Wellness & Hormonal Health",
  "Core Strength Training & Pelvic Floor Rehabilitation",
  "Pregnancy & Antenatal Yoga",
  "PCOD, PCOS, Endometriosis & Infertility Support",
  "Diabetes & Stress Management",
  "Sustainable Weight Loss & Nutrition Coaching",
  "Kids Yoga (Anatomy-based, engagement-focused learning)",
];

const credentials = [
  "Women Wellness Coach",
  "Certified Nutrigenomics Coach",
  "Certified Mental Health Coach",
  "Certified Nutrition & Fitness Consultant",
  "Registered Yoga Teacher (Yoga Alliance USA)",
  "Certified Ayurveda Consultant",
  "Certified Meditation Instructor",
  "Certified Antenatal Yoga Practitioner",
];

const impactStats = [
  { value: "740+", label: "Women Transformed", icon: Users },
  { value: "5", label: "Countries Worldwide", icon: Globe },
  { value: "400+", label: "Kgs Weight Loss Achieved", icon: Target },
  { value: "100+", label: "Sustainable Transformations", icon: Heart },
];

const FounderSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Award size={16} />
            Meet the Founder
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            About <span className="text-gradient-primary">Yagnasindu Balaraju</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform -rotate-3" />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-lg bg-card aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=600&h=750&fit=crop"
                alt="Yagnasindu Balaraju - Founder of NutriOMFit, Pregnancy Yoga Expert"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <h3 className="font-display text-xl font-bold text-foreground">Yagnasindu Balaraju</h3>
                <p className="text-primary font-medium">Women's Wellness Coach & Holistic Health Expert</p>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6">
            <div className="prose prose-lg">
              <p className="text-foreground/80 leading-relaxed">
                Yagnasindu Balaraju is a trained Women's Wellness coach and Holistic Health Coach, 
                renowned for her integrative, science-backed approach to yoga therapy, nutrition, 
                and mindful movement. With over seven years of dedicated practice, she has guided 
                <strong className="text-primary"> 740+ women across five countries</strong>—India, the UK, Canada, 
                the United States, and Australia—towards sustainable health, strength, and inner balance.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Her work is rooted in the philosophy that women's wellness is not a one-size-fits-all solution. 
                Every program designed by Yagnasindu Balaraju is <strong className="text-primary">women-exclusive</strong>, 
                intentionally crafted to support the female body through every life stage—hormonally, 
                physically, and emotionally.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Blending classical yoga wisdom, modern anatomy, Ayurveda, therapeutic strength training, 
                and mindfulness practices, she delivers a deeply personalized and results-driven wellness experience.
              </p>
            </div>

            {/* Kids Yoga Note */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-foreground/80 text-sm">
                <strong className="text-amber-600">Kids Yoga Methodology:</strong> Children are introduced to yoga through 
                curiosity and understanding—learning each posture with references to muscles, joints, and body mechanics, 
                fostering lifelong enthusiasm and discipline.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-card rounded-2xl border border-border text-center shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon size={24} className="text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Specializations & Credentials */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Specializations */}
          <div className="p-8 bg-card rounded-2xl border border-border shadow-card">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Target className="text-primary" size={24} />
              Areas of Specialization
            </h3>
            <ul className="space-y-3">
              {specializations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials */}
          <div className="p-8 bg-card rounded-2xl border border-border shadow-card">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="text-primary" size={24} />
              Credentials & Certifications
            </h3>
            <ul className="space-y-3">
              {credentials.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20 text-center">
          <p className="text-foreground/80 max-w-3xl mx-auto">
            <strong className="text-foreground">Trusted by medical professionals, corporate leaders, and high-performing women,</strong>{" "}
            NutriOMFit methodology delivers measurable transformation with elegance, precision, and care.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
