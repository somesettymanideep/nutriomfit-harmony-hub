// Store for service testimonial images (client transformation images)

export interface ServiceTestimonialImages {
  serviceId: string;
  images: string[]; // Array of image URLs
}

const STORAGE_KEY = 'serviceTestimonialImages';

export const getServiceTestimonialImages = (serviceId: string): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  const allImages: ServiceTestimonialImages[] = JSON.parse(stored);
  const serviceImages = allImages.find(s => s.serviceId === serviceId);
  return serviceImages?.images || [];
};

export const getAllServiceTestimonialImages = (): ServiceTestimonialImages[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveServiceTestimonialImages = (serviceId: string, images: string[]): void => {
  const allImages = getAllServiceTestimonialImages();
  const existingIndex = allImages.findIndex(s => s.serviceId === serviceId);
  
  if (existingIndex >= 0) {
    allImages[existingIndex].images = images;
  } else {
    allImages.push({ serviceId, images });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allImages));
};

export const addImageToService = (serviceId: string, imageUrl: string): void => {
  const images = getServiceTestimonialImages(serviceId);
  images.push(imageUrl);
  saveServiceTestimonialImages(serviceId, images);
};

export const removeImageFromService = (serviceId: string, imageIndex: number): void => {
  const images = getServiceTestimonialImages(serviceId);
  images.splice(imageIndex, 1);
  saveServiceTestimonialImages(serviceId, images);
};

export const updateImageInService = (serviceId: string, imageIndex: number, newUrl: string): void => {
  const images = getServiceTestimonialImages(serviceId);
  if (imageIndex >= 0 && imageIndex < images.length) {
    images[imageIndex] = newUrl;
    saveServiceTestimonialImages(serviceId, images);
  }
};
