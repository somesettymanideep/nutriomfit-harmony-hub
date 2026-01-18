export interface HomeVideo {
  id: string;
  videoUrl: string;
  title: string;
  thumbnail: string;
  createdAt: string;
}

const STORAGE_KEY = 'home_video_slider';

export const getHomeVideos = (): HomeVideo[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Default videos
  return [
    {
      id: '1',
      videoUrl: '#',
      title: 'Yoga Session',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      videoUrl: '#',
      title: 'Fitness Training',
      thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      videoUrl: '#',
      title: 'Diet Consultation',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      videoUrl: '#',
      title: 'Wellness Workshop',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      videoUrl: '#',
      title: 'Morning Routine',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600',
      createdAt: new Date().toISOString()
    }
  ];
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
