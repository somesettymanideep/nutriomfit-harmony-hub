import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHomeVideos, HomeVideo } from "@/lib/homeVideoSliderStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const VideoSliderSection = () => {
  const [videos, setVideos] = useState<HomeVideo[]>([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    setVideos(getHomeVideos());
  }, []);

  const handlePlayVideo = (videoUrl: string) => {
    if (videoUrl && videoUrl !== '#') {
      setPlayingVideo(videoUrl);
    }
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-charcoal to-charcoal/95 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Our Videos
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Watch Our <span className="text-primary">Wellness Journey</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Explore our collection of wellness, yoga, and fitness videos
          </p>
        </div>

        {/* Video Carousel */}
        <div className="relative max-w-6xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {videos.map((video) => (
                <CarouselItem key={video.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                      <button
                        onClick={() => handlePlayVideo(video.videoUrl)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                          <Play size={24} className="text-primary-foreground ml-1" />
                        </div>
                      </button>
                    </div>
                    {/* Title */}
                    <div className="p-4 bg-card">
                      <h3 className="text-foreground font-semibold text-center truncate">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" />
            <CarouselNext className="right-0 bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
            >
              Close ✕
            </button>
            <iframe
              src={playingVideo}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSliderSection;
