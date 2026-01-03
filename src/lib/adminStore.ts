// Simple localStorage-based store for admin panel (demo purposes)

export interface ConsultationSettings {
  fee: string;
  duration: string;
  timeSlots: string[];
  weekdayHours: string;
  weekendHours: string;
}

export interface BookingSubmission {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  timeSlot: string;
  serviceId?: string;
  serviceName?: string;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  whoIsFor: string;
  duration: string;
  iconType: 'heart' | 'apple' | 'baby' | 'droplets';
  isDefault?: boolean;
}

const ADMIN_CREDENTIALS = {
  email: 'admin@demo.com',
  password: 'Admin@123'
};

const DEFAULT_SERVICES: ServiceItem[] = [
  { 
    id: "women-wellness", 
    title: "Women Wellness Program", 
    subtitle: "Holistic wellness for women",
    description: "A comprehensive wellness program designed specifically for women's health needs.",
    features: ["Personalized nutrition plan", "Yoga therapy sessions", "Hormonal balance support"],
    benefits: ["Improved energy levels", "Better hormonal health", "Enhanced mental clarity"],
    whoIsFor: "Women looking to improve their overall health and wellness",
    duration: "8 weeks",
    iconType: "heart",
    isDefault: true
  },
  { 
    id: "diet-program", 
    title: "90-Day Diet Program", 
    subtitle: "Transform your eating habits",
    description: "A structured 90-day program to help you develop healthy eating habits.",
    features: ["Custom meal plans", "Weekly check-ins", "Recipe guides"],
    benefits: ["Sustainable weight management", "Better nutrition knowledge", "Improved metabolism"],
    whoIsFor: "Anyone looking to transform their diet and eating habits",
    duration: "90 days",
    iconType: "apple",
    isDefault: true
  },
  { 
    id: "kids-yoga", 
    title: "Kids Yoga", 
    subtitle: "Fun and healthy movement for children",
    description: "Engaging yoga sessions designed to help children develop flexibility and mindfulness.",
    features: ["Age-appropriate poses", "Fun games and activities", "Breathing exercises"],
    benefits: ["Improved flexibility", "Better focus", "Stress relief"],
    whoIsFor: "Children aged 5-12 years",
    duration: "4 weeks",
    iconType: "baby",
    isDefault: true
  },
  { 
    id: "gut-reset", 
    title: "LSP + Juice Fasting", 
    subtitle: "Reset your digestive system",
    description: "A gut reset program combining Liver Spleen Pancreas cleanse with juice fasting.",
    features: ["Detox protocols", "Juice recipes", "Guided fasting"],
    benefits: ["Improved digestion", "Increased energy", "Clearer skin"],
    whoIsFor: "Adults looking to reset their digestive health",
    duration: "2 weeks",
    iconType: "droplets",
    isDefault: true
  },
];

const DEFAULT_SETTINGS: ConsultationSettings = {
  fee: '₹999',
  duration: '30-45 minutes',
  timeSlots: [
    '10:00 AM - 10:45 AM',
    '11:00 AM - 11:45 AM',
    '2:00 PM - 2:45 PM',
    '3:00 PM - 3:45 PM',
    '5:00 PM - 5:45 PM'
  ],
  weekdayHours: 'Mon-Fri: 10:00 AM - 6:00 PM',
  weekendHours: 'Sat: 10:00 AM - 2:00 PM'
};

// Auth functions
export const validateAdminLogin = (email: string, password: string): boolean => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

export const isAdminLoggedIn = (): boolean => {
  return sessionStorage.getItem('adminLoggedIn') === 'true';
};

export const setAdminLoggedIn = (value: boolean): void => {
  if (value) {
    sessionStorage.setItem('adminLoggedIn', 'true');
  } else {
    sessionStorage.removeItem('adminLoggedIn');
  }
};

// Settings functions
export const getConsultationSettings = (): ConsultationSettings => {
  const stored = localStorage.getItem('consultationSettings');
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
};

export const saveConsultationSettings = (settings: ConsultationSettings): void => {
  localStorage.setItem('consultationSettings', JSON.stringify(settings));
};

// Bookings functions
export const getBookings = (): BookingSubmission[] => {
  const stored = localStorage.getItem('bookingSubmissions');
  return stored ? JSON.parse(stored) : [];
};

export const addBooking = (booking: Omit<BookingSubmission, 'id' | 'submittedAt' | 'status'>): BookingSubmission => {
  const bookings = getBookings();
  const newBooking: BookingSubmission = {
    ...booking,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };
  bookings.push(newBooking);
  localStorage.setItem('bookingSubmissions', JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (id: string, status: BookingSubmission['status']): void => {
  const bookings = getBookings();
  const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
  localStorage.setItem('bookingSubmissions', JSON.stringify(updated));
};

export const deleteBooking = (id: string): void => {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  localStorage.setItem('bookingSubmissions', JSON.stringify(filtered));
};

// Services functions - now manages all services (default + custom)
export const getAllServices = (): ServiceItem[] => {
  const stored = localStorage.getItem('allServices');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default services if not stored
  localStorage.setItem('allServices', JSON.stringify(DEFAULT_SERVICES));
  return DEFAULT_SERVICES;
};

export const saveAllServices = (services: ServiceItem[]): void => {
  localStorage.setItem('allServices', JSON.stringify(services));
};

export const addService = (service: Omit<ServiceItem, 'id'>): ServiceItem => {
  const services = getAllServices();
  const newService: ServiceItem = {
    ...service,
    id: `custom-${Date.now()}`,
    isDefault: false
  };
  services.push(newService);
  saveAllServices(services);
  return newService;
};

export const updateService = (id: string, serviceData: Partial<ServiceItem>): void => {
  const services = getAllServices();
  const updated = services.map(s => s.id === id ? { ...s, ...serviceData } : s);
  saveAllServices(updated);
};

export const deleteService = (id: string): void => {
  const services = getAllServices();
  const filtered = services.filter(s => s.id !== id);
  saveAllServices(filtered);
};

// Legacy functions for backward compatibility
export const getCustomServices = (): ServiceItem[] => {
  return getAllServices().filter(s => !s.isDefault);
};

export const saveCustomServices = (services: ServiceItem[]): void => {
  const allServices = getAllServices();
  const defaultServices = allServices.filter(s => s.isDefault);
  saveAllServices([...defaultServices, ...services]);
};

export const addCustomService = (service: Omit<ServiceItem, 'id'>): ServiceItem => {
  return addService(service);
};

export const updateCustomService = (id: string, service: Partial<ServiceItem>): void => {
  updateService(id, service);
};

export const deleteCustomService = (id: string): void => {
  deleteService(id);
};

// Reset services to default
export const resetServicesToDefault = (): void => {
  localStorage.setItem('allServices', JSON.stringify(DEFAULT_SERVICES));
};
