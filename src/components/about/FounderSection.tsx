import founderImage from "@/assets/founder-yoga.jpg";
import { Award, Globe, Users, Scale } from "lucide-react";

const certifications = [
  "Women Wellness Coach",
  "Certified Nutrigenomics Coach",
  "Certified Mental Health Coach",
  "Certified Nutrition & Fitness Consultant",
  "Registered Yoga Teacher (Yoga Alliance USA)",
  "Certified Ayurveda Consultant",
  "Certified Meditation Instructor",
  "Certified Antenatal Yoga Practitioner",
];

const specializations = [
  "Women's Wellness & Hormonal Health",
  "Core Strength Training & Pelvic Floor Rehabilitation",
  "Pregnancy & Antenatal Yoga",
  "PCOD, PCOS, Endometriosis & Infertility Support",
  "Diabetes & Stress Management",
  "Sustainable Weight Loss & Nutrition Coaching",
  "Kids Yoga (Anatomy-based, engagement-focused learning)",
];

const impactStats = [
  { icon: Users, value: "740+", label: "Women Transformed" },
  { icon: Globe, value: "5", label: "Countries" },
  { icon: Scale, value: "400+", label: "kg Weight Loss" },
];

const FounderSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the <span className="text-gradient-primary">Founder</span>
          </h2>
        </div>

        {/* Main Layout: Image 1/3, Content 2/3 on desktop */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image - Takes 4 columns (1/3) on desktop */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform -rotate-3" />
              <img
                src={founderImage}
                alt="Yagnasindu Balaraju - Founder of NutriOMFit"
                className="relative w-full aspect-[3/4] object-cover rounded-2xl shadow-xl"
              />
            </div>
            
            {/* Impact Stats - Below image */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {impactStats.map((stat) => (
                <div key={stat.label} className="p-4 bg-card rounded-xl border border-border text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="font-display text-xl font-bold text-primary">{stat.value}</div>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content - Takes 8 columns (2/3) on desktop */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Yagnasindu Balaraju
              </h3>
              <p className="text-primary font-medium text-lg">
                Women's Wellness Coach & Holistic Health Expert
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-foreground/80 leading-relaxed">
                Yagnasindu Balaraju is a trained Women's Wellness coach and Holistic Health Coach, 
                renowned for her integrative, science-backed approach to yoga therapy, nutrition, 
                and mindful movement. With over seven years of dedicated practice, she has guided 
                740+ women across five countries—India, the UK, Canada, the United States, and 
                Australia—towards sustainable health, strength, and inner balance.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Her work is rooted in the philosophy that women's wellness is not a one-size-fits-all 
                solution. Every program designed by Yagnasindu Balaraju is women-exclusive, intentionally 
                crafted to support the female body through every life stage—hormonally, physically, and 
                emotionally.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Blending classical yoga wisdom, modern anatomy, Ayurveda, therapeutic strength training, 
                and mindfulness practices, she delivers a deeply personalized and results-driven wellness 
                experience.
              </p>
            </div>

            {/* Specializations */}
            <div className="p-6 bg-secondary/50 rounded-2xl">
              <h4 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Award className="text-primary" size={20} />
                Areas of Specialization
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {specializations.map((spec) => (
                  <div key={spec} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/80 text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <h4 className="font-display font-semibold text-lg text-foreground mb-4">
                Credentials & Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1.5 bg-card rounded-full text-sm text-foreground/80 border border-border"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Kids Yoga Note */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-foreground/80 text-sm">
                <strong className="text-foreground">Kids Yoga Methodology:</strong> In her Kids Yoga 
                methodology, children are introduced to yoga through curiosity and understanding—learning 
                each posture with references to muscles, joints, and body mechanics, fostering lifelong 
                enthusiasm and discipline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
