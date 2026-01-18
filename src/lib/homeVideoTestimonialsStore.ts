export interface HomeVideoTestimonial {
  id: string;
  videoUrl: string;
  serviceName: string;
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
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      videoUrl: '#',
      serviceName: 'Women Wellness Program',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      videoUrl: '#',
      serviceName: 'LSP + Juice Fasting',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      videoUrl: '#',
      serviceName: 'Kids Yoga',
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      videoUrl: '#',
      serviceName: '90-Day Diet Program',
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
