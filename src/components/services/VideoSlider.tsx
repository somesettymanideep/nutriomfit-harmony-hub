import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

// Sample video testimonials - can be replaced with actual videos
const sampleVideos = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    title: "Weight Loss Transformation Journey",
    duration: "3:45",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
    title: "Pregnancy Yoga Success Story",
    duration: "4:20",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
    title: "Hormonal Balance Results",
    duration: "2:55",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=225&fit=crop",
    title: "Kids Yoga Benefits",
    duration: "3:10",
  },
];

const VideoSlider = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % sampleVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + sampleVideos.length) % sampleVideos.length);
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Success <span className="text-gradient-primary">Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch real transformations and hear from our clients about their wellness journey with NutriOMFit.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-4">
              <img
                src={sampleVideos[currentVideoIndex].thumbnail}
                alt={sampleVideos[currentVideoIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
                  <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-primary-foreground font-medium text-lg drop-shadow-lg">
                  {sampleVideos[currentVideoIndex].title}
                </p>
                <p className="text-primary-foreground/80 text-sm">{sampleVideos[currentVideoIndex].duration}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevVideo}
                className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex gap-2">
                {sampleVideos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentVideoIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextVideo}
                className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {sampleVideos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentVideoIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSlider;
