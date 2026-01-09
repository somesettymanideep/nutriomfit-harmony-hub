import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

// Video data structure for each service
const serviceVideos = {
  "women-wellness": [
    {
      id: "ww-1",
      title: "Pregnancy yoga Cilent Review",
      videoUrl: "https://image2url.com/r2/default/videos/1767904325649-9e050c52-fa5a-4b67-af0f-86f60be6c175.mp4",
      duration: "3:45"
    }
  ],
  "diet-program": [
    {
      id: "dp-1",
      title: "90-Day+21 Days Cilent review",
      videoUrl: "https://image2url.com/r2/default/videos/1767809685115-ea0d78a1-3741-4a6c-8171-419f1569e1ed.mp4",
      duration: "4:20"
    },
    {
      id: "dp-2",
      title: "90-Day+21 Days Cilent review",
      videoUrl: "https://image2url.com/r2/default/videos/1767810994722-f0da3995-d7e3-4d05-85b9-8c6700083f1a.mp4",
      duration: "5:45"
    },
    {
      id: "dp-3",
      title: "90-Day+21 Days Cilent review",
      videoUrl: "https://image2url.com/r2/default/videos/1767811143780-d9f99fb0-b52d-448c-86bf-8e15d286a286.mp4",
      duration: "3:30"
    },
    {
      id: "dp-4",
      title: "90-Day+21 Days Cilent review",
      videoUrl: "https://image2url.com/r2/default/videos/1767809343057-dfd46ab1-3c93-4dcd-857a-7753383ebd80.mp4",
      duration: "3:30"
    }
  ],
  "kids-yoga": [
    {
      id: "ky-1",
      title: "Fun Yoga Poses for Kids",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "3:15"
    },
    {
      id: "ky-2",
      title: "Anatomy Learning Session",
      videoUrl: "https://image2url.com/r2/bucket2/images/1767812217487-ede463b4-a8aa-4e1a-b051-76460bcc5c0c.jpeg",
      duration: "4:40"
    }
  ],
  "gut-reset": [
    {
      id: "gr-1",
      title: "LSP + Juice Fasting cilent Review",
      videoUrl: "https://image2url.com/r2/default/videos/1767811420506-e2d18ee1-73b0-4d84-a874-fb0644f7e507.mp4",
      duration: "4:30"
    }
  ]
};

interface ServiceVideoSliderProps {
  serviceId: string;
  serviceTitle: string;
}

const Servicesvideos = ({ serviceId, serviceTitle }: ServiceVideoSliderProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const videos = serviceVideos[serviceId as keyof typeof serviceVideos] || [];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (videos.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Play className="text-primary" size={24} />
        Client Testimonials
      </h3>

      {/* 4 Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video.videoUrl)}
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            {/* Video Card */}
            <div className="relative rounded-xl overflow-hidden bg-card border border-border shadow-card transition-all duration-300 hover:shadow-lg hover:scale-105">
              {/* Video Preview */}
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-xl">
                    <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium backdrop-blur-sm">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 bg-gradient-to-b from-card to-card/80">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors rounded-full hover:bg-white/10"
              aria-label="Close video"
            >
              <X size={32} />
            </button>

            {/* Video Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full"
                controlsList="nodownload"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicesvideos;