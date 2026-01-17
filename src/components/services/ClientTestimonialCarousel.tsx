import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getServiceTestimonialImages } from "@/lib/serviceTestimonialImagesStore";
import { Users, ImageIcon } from "lucide-react";

interface ClientTestimonialCarouselProps {
  serviceId: string;
  serviceTitle: string;
}

const ClientTestimonialCarousel = ({ serviceId, serviceTitle }: ClientTestimonialCarouselProps) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = () => {
      const storedImages = getServiceTestimonialImages(serviceId);
      setImages(storedImages);
    };

    loadImages();

    // Refresh on focus to catch admin updates
    const handleFocus = () => loadImages();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [serviceId]);

  // Don't render if no images
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-xl text-foreground">
            Client Transformations
          </h3>
          <p className="text-sm text-muted-foreground">
            Real results from our {serviceTitle} program
          </p>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: images.length > 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((imageUrl, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border shadow-card group">
                <img
                  src={imageUrl}
                  alt={`${serviceTitle} client transformation ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ClientTestimonialCarousel;
