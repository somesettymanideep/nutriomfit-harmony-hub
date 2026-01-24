export interface HomeVideo {
  id: string;
  videoUrl: string;
  serviceName: string;
  createdAt: string;
}

const STORAGE_KEY = 'home_video_slider';

export const getHomeVideos = (): HomeVideo[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

export const saveHomeVideos = (videos: HomeVideo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
};

export const addHomeVideo = (video: Omit<HomeVideo, 'id' | 'createdAt'>): HomeVideo => {
  const videos = getHomeVideos();
  const newVideo: HomeVideo = {
    ...video,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  videos.push(newVideo);
  saveHomeVideos(videos);
  return newVideo;
};

export const deleteHomeVideo = (id: string) => {
  const videos = getHomeVideos();
  const filtered = videos.filter(v => v.id !== id);
  saveHomeVideos(filtered);
};

export const updateHomeVideo = (id: string, updates: Partial<Omit<HomeVideo, 'id' | 'createdAt'>>) => {
  const videos = getHomeVideos();
  const index = videos.findIndex(v => v.id === id);
  if (index !== -1) {
    videos[index] = { ...videos[index], ...updates };
    saveHomeVideos(videos);
  }
};
