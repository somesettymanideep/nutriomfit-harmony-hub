export interface ServiceVideo {
  id: string;
  serviceId: string;
  title: string;
  videoData: string;
  thumbnail: string;
  duration: string;
  uploadedAt: string;
}

const DB_NAME = 'serviceVideosDB';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

// Initialize IndexedDB
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('serviceId', 'serviceId', { unique: false });
      }
    };
  });
};

// Get all videos
export const getAllServiceVideos = async (): Promise<ServiceVideo[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting videos:', error);
    return [];
  }
};

// Get videos for a specific service
export const getServiceVideos = async (serviceId: string): Promise<ServiceVideo[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('serviceId');
      const request = index.getAll(serviceId);
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting service videos:', error);
    return [];
  }
};

// Add a new video
export const addServiceVideo = async (
  serviceId: string, 
  title: string, 
  videoData: string, 
  thumbnail: string,
  duration: string
): Promise<ServiceVideo> => {
  const video: ServiceVideo = {
    id: crypto.randomUUID(),
    serviceId,
    title,
    videoData,
    thumbnail,
    duration,
    uploadedAt: new Date().toISOString()
  };
  
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(video);
    
    request.onsuccess = () => resolve(video);
    request.onerror = () => reject(request.error);
  });
};

// Delete a video
export const deleteServiceVideo = async (videoId: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(videoId);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Validate video file (10MB limit)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

export const validateVideoFile = (file: File): { valid: boolean; error?: string } => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload MP4, WebM, or OGG.' };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds 10MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB` };
  }
  
  return { valid: true };
};

// Convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Generate video thumbnail
export const generateVideoThumbnail = (videoData: string): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = videoData;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    
    video.onloadeddata = () => {
      video.currentTime = 1;
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      } else {
        resolve('');
      }
    };
    
    video.onerror = () => resolve('');
  });
};

// Get video duration
export const getVideoDuration = (videoData: string): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = videoData;
    
    video.onloadedmetadata = () => {
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };
    
    video.onerror = () => resolve('0:00');
  });
};
