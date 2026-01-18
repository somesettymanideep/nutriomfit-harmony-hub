export interface HomeVideoTestimonial {
  id: string;
  videoUrl: string;
  serviceName: string;
  thumbnail: string;
  createdAt: string;
}

const STORAGE_KEY = 'home_video_testimonials';

export const getHomeVideoTestimonials = (): HomeVideoTestimonial[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Default videos
  return [
    {
      id: '1',
      videoUrl: '#',
      serviceName: '90-Day Diet Program',
      thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      videoUrl: '#',
      serviceName: 'Women Wellness Program',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      videoUrl: '#',
      serviceName: 'LSP + Juice Fasting',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      videoUrl: '#',
      serviceName: 'Kids Yoga',
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      videoUrl: '#',
      serviceName: '90-Day Diet Program',
      thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      createdAt: new Date().toISOString()
    }
  ];
};

export const saveHomeVideoTestimonials = (testimonials: HomeVideoTestimonial[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
};

export const addHomeVideoTestimonial = (testimonial: Omit<HomeVideoTestimonial, 'id' | 'createdAt'>): HomeVideoTestimonial => {
  const testimonials = getHomeVideoTestimonials();
  const newTestimonial: HomeVideoTestimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  testimonials.push(newTestimonial);
  saveHomeVideoTestimonials(testimonials);
  return newTestimonial;
};

export const deleteHomeVideoTestimonial = (id: string) => {
  const testimonials = getHomeVideoTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  saveHomeVideoTestimonials(filtered);
};

export const updateHomeVideoTestimonial = (id: string, updates: Partial<Omit<HomeVideoTestimonial, 'id' | 'createdAt'>>) => {
  const testimonials = getHomeVideoTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    testimonials[index] = { ...testimonials[index], ...updates };
    saveHomeVideoTestimonials(testimonials);
  }
};
