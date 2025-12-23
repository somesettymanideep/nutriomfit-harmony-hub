import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Brain, Heart, Shield } from "lucide-react";
import { useAboutContent } from "@/contexts/AboutContentContext";

const featureIcons = [Leaf, Brain, Heart, Shield];

const AboutPreview = () => {
  const { content } = useAboutContent();

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              {content.badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {content.heading}{" "}
              <span className="text-gradient-primary">{content.headingHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {content.description}
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {content.features.map((feature, index) => {
              const Icon = featureIcons[index] || Leaf;
              return (
                <div
                  key={index}
                  className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon size={24} className="text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
