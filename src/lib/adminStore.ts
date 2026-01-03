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
    description: "A comprehensive wellness program designed specifically for women, combining therapeutic yoga with progressive strength training to achieve hormonal balance, build strength, and cultivate mental clarity.",
    features: [
      "Therapeutic yoga following IAYT approach",
      "Theme-based sessions: spine health, pelvic wellness, stress release, diabetes yoga",
      "Netra Yoga (eye exercises) & Mukha Yoga (facial yoga)",
      "Pranayama and meditation practices",
      "Core strengthening with dumbbells and progressive overload",
      "Personalized guidance and tracking",
    ],
    benefits: [
      "Improved hormonal balance",
      "Increased strength and flexibility",
      "Better stress management",
      "Enhanced emotional clarity",
      "Greater body awareness",
      "Sustainable lifestyle habits",
    ],
    whoIsFor: "Women of all ages seeking holistic wellness, hormonal balance, and strength building in a supportive, understanding environment.",
    duration: "8 weeks",
    iconType: "heart",
    isDefault: true
  },
  { 
    id: "diet-program", 
    title: "90-Day Diet Program", 
   subtitle: "The 111-Day Transformation Model",
    description: "A scientifically designed nutrition program using the innovative Cognitive Plating Method. Transform your relationship with food through 4 structured cycles, leading to sustainable weight management and lifelong healthy eating habits.",
    features: [
      "Personalized diet based on metabolic profile",
      "Cognitive Plating Method for mindful eating",
      "4 cycles of 21 days each with refeed days",
      "21-day post-program maintenance phase",
      "Regular check-ins and adjustments",
      "Educational nutrition guidance",
    ],
    benefits: [
      "Sustainable weight loss",
      "Improved metabolic health",
      "Better understanding of nutrition",
      "Reduced food cravings",
      "Improved energy levels",
      "Lifelong healthy eating patterns",
    ],
    whoIsFor: "Anyone seeking lasting weight management through science-based nutrition, not crash diets. Perfect for those ready to commit to real change.",
    duration: "90 days",
    iconType: "apple",
    isDefault: true
  },
  { 
    id: "kids-yoga", 
    title: "Kids Yoga", 
    subtitle: "Ages 7-14: Learn, Play, Grow",
    description: "A fun, educational yoga program that teaches children about their bodies through anatomy-based learning. Kids develop physical strength, emotional balance, and mindfulness skills while enjoying engaging practices.",
    features: [
      "Anatomy-based yoga learning",
      "Yogic chants, mantras, and cultural education",
      "Netra Yoga (eye exercises) & Mukha Yoga",
      "Age-appropriate pranayama techniques",
      "Practice Merit Points reward system",
      "\"Balayogi of the Month\" recognition",
    ],
    benefits: [
      "Improved physical coordination",
      "Better focus and concentration",
      "Emotional regulation skills",
      "Understanding of body anatomy",
      "Discipline and self-awareness",
      "Fun, healthy social interaction",
    ],
    whoIsFor: "Children aged 7-14 who want to learn yoga in a fun, engaging way. Parents who value holistic education and want their kids to develop healthy habits early.",
    duration: "4 weeks",
    iconType: "baby",
    isDefault: true
  },
  { 
    id: "gut-reset", 
    title: "LSP + Juice Fasting", 
    subtitle: "4-Day Gut Reset Program",
    description: "A supervised gut cleansing protocol combining Laghu Shankha Prakshalana with monitored juice fasting. This intensive program is designed for digestive reset and body rejuvenation under careful professional guidance.",
    features: [
      "Day 1: Laghu Shankha Prakshalana cleansing",
      "Days 2-4: Monitored juice fasting",
      "Pre-program medical review required",
      "Daily check-ins and guidance",
      "Post-program diet recommendations",
      "Educational materials on gut health",
    ],
    benefits: [
      "Complete digestive reset",
      "Gut rest and rejuvenation",
      "Toxin elimination",
      "Improved digestion long-term",
      "Mental clarity",
      "Reset eating patterns",
    ],
    whoIsFor: "Adults seeking deep digestive cleansing who are medically cleared. Not suitable for everyone—medical review determines eligibility.",
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
