import { useState, useEffect, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getServiceVideos, ServiceVideo } from "@/lib/serviceVideoStore";

interface ServiceVideoSliderProps {
  serviceId: string;
  serviceTitle: string;
}

const ServiceVideoSlider = ({ serviceId, serviceTitle }: ServiceVideoSliderProps) => {
  const [videos, setVideos] = useState<ServiceVideo[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadVideos = () => {
      setVideos(getServiceVideos(serviceId));
    };
    loadVideos();

    // Refresh on focus (in case admin uploaded videos)
    const handleFocus = () => loadVideos();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [serviceId]);

  // Don't render if no videos
  if (videos.length === 0) {
    return null;
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleCloseVideo = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="mt-8 p-6 bg-accent/30 rounded-2xl">
      <h4 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
        <Play size={20} className="text-primary" />
        {serviceTitle} Success Stories
      </h4>

      <div className="relative">
        {/* Main Video/Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
          {isPlaying ? (
            <>
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
              />
              <button
                onClick={handleCloseVideo}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors z-10"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <img
                src={currentVideo.thumbnail || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop"}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                <button 
                  onClick={handlePlayClick}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
                >
                  <Play size={24} className="text-primary-foreground ml-1" fill="currentColor" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-primary-foreground font-medium drop-shadow-lg">
                  {currentVideo.title}
                </p>
                <p className="text-primary-foreground/80 text-sm">{currentVideo.duration}</p>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        {videos.length > 1 && (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prevVideo}
              className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentVideoIndex(index);
                    setIsPlaying(false);
                  }}
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
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Thumbnails */}
        {videos.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {videos.slice(0, 4).map((video, index) => (
              <button
                key={video.id}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setIsPlaying(false);
                }}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentVideoIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img 
                  src={video.thumbnail || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop"} 
                  alt={video.title} 
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceVideoSlider;
