import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Women Wellness Member",
    content: "NUTRIOMFIT has completely transformed my approach to health. The women's wellness program helped me achieve hormonal balance, better sleep, and a strength I never knew I had. The personalized attention is exceptional!",
    rating: 5,
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Healthcare Professional",
    content: "As a doctor, I appreciate their evidence-based approach. The 90-day diet program is scientifically sound, and I've seen remarkable results in my own health. I now recommend NUTRIOMFIT to my patients.",
    rating: 5,
  },
  {
    name: "Meera Patel",
    role: "Parent of Kids Yoga Student",
    content: "My daughter absolutely loves the kids yoga sessions! She's learning about her body, practicing mindfulness, and has become so much calmer. The Balayogi of the Month motivation keeps her excited every week.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            What Our{" "}
            <span className="text-gradient-primary">Community</span> Says
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from real people who have transformed their lives with NUTRIOMFIT.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Quote size={16} className="text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
