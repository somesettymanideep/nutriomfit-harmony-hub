import { useState } from "react";
import { Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const videoTestimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Gynecologist",
    thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    videoUrl: "#",
    quote:
      "The 90-Day Diet Program transformed my relationship with food. I lost 12 kg and feel more energetic than ever.",
    program: "90-Day Diet Program",
  },
  {
    id: 2,
    name: "Ananya Krishnan",
    role: "IT Professional",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    videoUrl: "#",
    quote:
      "The Women Wellness Program helped me manage my PCOS symptoms naturally. The therapeutic yoga sessions are life-changing.",
    program: "Women Wellness Program",
  },
  {
    id: 3,
    name: "Ravi Menon",
    role: "Business Owner",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    videoUrl: "#",
    quote:
      "The LSP + Juice Fasting reset my entire digestive system. I feel rejuvenated and my energy levels have skyrocketed.",
    program: "LSP + Juice Fasting",
  },
  {
    id: 4,
    name: "Meera & Arjun's Mom",
    role: "Parent",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    videoUrl: "#",
    quote:
      "My kids love the yoga classes! They've become more focused and calm. The anatomy-based learning is brilliant.",
    program: "Kids Yoga",
  },
  {
    id: 5,
    name: "Dr. Vikram Patel",
    role: "Pediatrician",
    thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    videoUrl: "#",
    quote:
      "As a medical professional, I appreciate the evidence-based approach. Lost 15 kg safely with the diet program.",
    program: "90-Day Diet Program",
  },
];

const VideoTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % videoTestimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + videoTestimonials.length) % videoTestimonials.length
    );
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (activeIndex + i + videoTestimonials.length) % videoTestimonials.length;
      cards.push({ ...videoTestimonials[index], position: i });
    }
    return cards;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-charcoal to-charcoal/95 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Video Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Real Stories, Real <span className="text-primary">Transformations</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Hear directly from our community members about their wellness
            journey with NUTRIOMFIT.
          </p>
        </div>

        {/* Video Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Cards Container */}
          <div className="flex items-center justify-center gap-6 py-8">
            {getVisibleCards().map((testimonial) => (
              <div
                key={`${testimonial.id}-${testimonial.position}`}
                className={`transition-all duration-500 ${
                  testimonial.position === 0
                    ? "scale-100 opacity-100 z-10"
                    : "scale-75 opacity-50 hidden md:block"
                }`}
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-2xl max-w-md">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video">
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                    <button
                      onClick={() =>
                        setIsPlaying(
                          isPlaying === testimonial.id ? null : testimonial.id
                        )
                      }
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play size={28} className="text-primary-foreground ml-1" />
                      </div>
                    </button>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {testimonial.program}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Quote size={24} className="text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.thumbnail}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary hover:border-primary"
            >
              <ChevronLeft size={20} />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {videoTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary hover:border-primary"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
