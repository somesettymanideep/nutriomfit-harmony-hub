import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHomeVideoTestimonials, HomeVideoTestimonial } from "@/lib/homeVideoTestimonialsStore";

const VideoTestimonials = () => {
  const [testimonials, setTestimonials] = useState<HomeVideoTestimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  useEffect(() => {
    setTestimonials(getHomeVideoTestimonials());
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleCards = () => {
    if (testimonials.length === 0) return [];
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + testimonials.length) % testimonials.length;
      cards.push({ ...testimonials[index], position: i });
    }
    return cards;
  };

  if (testimonials.length === 0) {
    return null;
  }

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
                  {/* Video Card */}
                  <div className="relative aspect-video bg-muted flex items-center justify-center">
                    <Video className="w-16 h-16 text-muted-foreground/50" />
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
                      {testimonial.serviceName}
                    </span>
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
              {testimonials.map((_, index) => (
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
