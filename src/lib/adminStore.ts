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
}

const ADMIN_CREDENTIALS = {
  email: 'admin@demo.com',
  password: 'Admin@123'
};

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

// Custom services (for admin to add/edit)
export const getCustomServices = (): ServiceItem[] => {
  const stored = localStorage.getItem('customServices');
  return stored ? JSON.parse(stored) : [];
};

export const saveCustomServices = (services: ServiceItem[]): void => {
  localStorage.setItem('customServices', JSON.stringify(services));
};

export const addCustomService = (service: Omit<ServiceItem, 'id'>): ServiceItem => {
  const services = getCustomServices();
  const newService: ServiceItem = {
    ...service,
    id: `custom-${Date.now()}`
  };
  services.push(newService);
  saveCustomServices(services);
  return newService;
};

export const updateCustomService = (id: string, service: Partial<ServiceItem>): void => {
  const services = getCustomServices();
  const updated = services.map(s => s.id === id ? { ...s, ...service } : s);
  saveCustomServices(updated);
};

export const deleteCustomService = (id: string): void => {
  const services = getCustomServices();
  const filtered = services.filter(s => s.id !== id);
  saveCustomServices(filtered);
};
