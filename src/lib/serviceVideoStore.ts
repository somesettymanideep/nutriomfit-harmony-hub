// Service video storage management

export interface ServiceVideo {
  id: string;
  serviceId: string;
  title: string;
  videoUrl: string; // base64 data URL for uploaded videos
  thumbnail: string;
  duration: string;
  uploadedAt: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Get all videos for a specific service
export const getServiceVideos = (serviceId: string): ServiceVideo[] => {
  const stored = localStorage.getItem('serviceVideos');
  const allVideos: ServiceVideo[] = stored ? JSON.parse(stored) : [];
  return allVideos.filter(v => v.serviceId === serviceId);
};

// Get all videos
export const getAllServiceVideos = (): ServiceVideo[] => {
  const stored = localStorage.getItem('serviceVideos');
  return stored ? JSON.parse(stored) : [];
};

// Add a video to a service
export const addServiceVideo = (
  serviceId: string,
  title: string,
  videoData: string,
  thumbnail: string,
  duration: string
): ServiceVideo => {
  const allVideos = getAllServiceVideos();
  const newVideo: ServiceVideo = {
    id: `video-${Date.now()}`,
    serviceId,
    title,
    videoUrl: videoData,
    thumbnail,
    duration,
    uploadedAt: new Date().toISOString(),
  };
  allVideos.push(newVideo);
  localStorage.setItem('serviceVideos', JSON.stringify(allVideos));
  return newVideo;
};

// Delete a video
export const deleteServiceVideo = (videoId: string): void => {
  const allVideos = getAllServiceVideos();
  const filtered = allVideos.filter(v => v.id !== videoId);
  localStorage.setItem('serviceVideos', JSON.stringify(filtered));
};

// Update video details
export const updateServiceVideo = (videoId: string, data: Partial<ServiceVideo>): void => {
  const allVideos = getAllServiceVideos();
  const updated = allVideos.map(v => v.id === videoId ? { ...v, ...data } : v);
  localStorage.setItem('serviceVideos', JSON.stringify(updated));
};

// Validate file size (5MB limit)
export const validateVideoFile = (file: File): { valid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size exceeds 5MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB` 
    };
  }
  
  const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (!validTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Please upload MP4, WebM, or OGG video.' 
    };
  }
  
  return { valid: true };
};

// Convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Generate video thumbnail (first frame)
export const generateVideoThumbnail = (videoUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    
    video.onloadeddata = () => {
      video.currentTime = 0;
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 225;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      } else {
        resolve('');
      }
    };
    
    video.onerror = () => {
      resolve('');
    };
  });
};

// Get video duration formatted
export const getVideoDuration = (videoUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };
    video.onerror = () => {
      resolve('0:00');
    };
  });
};
