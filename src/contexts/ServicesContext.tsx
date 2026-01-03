import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface TimeSlot {
  day: string;
  slots: string[];
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  detailedProcedure: string;
  consultationFee: number;
  consultationDuration: string;
  timeSlots: TimeSlot[];
  timeZone: string;
  supportEmail: string;
  supportWhatsApp: string;
  isActive: boolean;
  showBookButton: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface ServicesContextType {
  services: Service[];
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  getServiceById: (id: string) => Service | undefined;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const defaultServices: Service[] = [
  {
    id: "women-wellness",
    title: "Women Wellness Program",
    shortDescription: "Holistic Health for Modern Women - A comprehensive wellness program designed specifically for women.",
    detailedProcedure: `<h3>About This Consultation</h3>
<p>This consultation is designed to understand your health goals, current lifestyle, and any specific concerns you may have. Our expert will guide you through our Women Wellness Program and help create a personalized plan.</p>

<h3>What We'll Discuss</h3>
<ul>
<li>Your current health status and goals</li>
<li>Therapeutic yoga approaches (IAYT certified)</li>
<li>Progressive strength training methods</li>
<li>Hormonal balance strategies</li>
<li>Personalized program recommendations</li>
</ul>`,
    consultationFee: 999,
    consultationDuration: "45 minutes",
    timeSlots: [
      { day: "Weekdays", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
      { day: "Weekends", slots: ["10:00 AM", "12:00 PM"] }
    ],
    timeZone: "IST (Indian Standard Time)",
    supportEmail: "support@nutriomfit.com",
    supportWhatsApp: "+919876543210",
    isActive: true,
    showBookButton: true,
    icon: "Heart",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    id: "diet-program",
    title: "90-Day Diet Program",
    shortDescription: "The 111-Day Transformation Model using the innovative Cognitive Plating Method.",
    detailedProcedure: `<h3>About This Consultation</h3>
<p>Understand how our science-based nutrition program can transform your relationship with food. Learn about the Cognitive Plating Method and the 4 structured cycles.</p>

<h3>What We'll Discuss</h3>
<ul>
<li>Your dietary history and challenges</li>
<li>The 111-day transformation model</li>
<li>Cognitive Plating Method explained</li>
<li>Expected outcomes and milestones</li>
<li>Program customization options</li>
</ul>`,
    consultationFee: 1499,
    consultationDuration: "60 minutes",
    timeSlots: [
      { day: "Weekdays", slots: ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"] },
      { day: "Weekends", slots: ["11:00 AM", "1:00 PM"] }
    ],
    timeZone: "IST (Indian Standard Time)",
    supportEmail: "diet@nutriomfit.com",
    supportWhatsApp: "+919876543211",
    isActive: true,
    showBookButton: true,
    icon: "Apple",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "kids-yoga",
    title: "Kids Yoga Program",
    shortDescription: "Ages 7-14: Learn, Play, Grow - Fun, educational yoga for children.",
    detailedProcedure: `<h3>About This Consultation</h3>
<p>A consultation for parents to understand how our Kids Yoga program can benefit their children. Learn about our anatomy-based approach and reward system.</p>

<h3>What We'll Discuss</h3>
<ul>
<li>Your child's current activity level</li>
<li>Anatomy-based yoga learning approach</li>
<li>Practice Merit Points system</li>
<li>Class schedules and formats</li>
<li>Safety and supervision protocols</li>
</ul>`,
    consultationFee: 499,
    consultationDuration: "30 minutes",
    timeSlots: [
      { day: "Weekdays", slots: ["4:00 PM", "5:00 PM", "6:00 PM"] },
      { day: "Weekends", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] }
    ],
    timeZone: "IST (Indian Standard Time)",
    supportEmail: "kids@nutriomfit.com",
    supportWhatsApp: "+919876543212",
    isActive: true,
    showBookButton: true,
    icon: "Baby",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    id: "gut-reset",
    title: "LSP + Juice Fasting",
    shortDescription: "4-Day Gut Reset Program - A supervised gut cleansing protocol.",
    detailedProcedure: `<h3>About This Consultation</h3>
<p>This is a <strong>mandatory pre-program consultation</strong> to assess your eligibility for the Gut Reset program. Medical review is required before participation.</p>

<h3>What We'll Discuss</h3>
<ul>
<li>Your medical history and current health</li>
<li>Eligibility assessment</li>
<li>The LSP cleansing process explained</li>
<li>Juice fasting protocol details</li>
<li>Post-program care and diet</li>
</ul>

<p class="warning"><strong>⚠️ Important:</strong> This program is not suitable for everyone. Medical clearance is mandatory.</p>`,
    consultationFee: 799,
    consultationDuration: "45 minutes",
    timeSlots: [
      { day: "Weekdays", slots: ["10:00 AM", "2:00 PM"] },
      { day: "Weekends", slots: ["10:00 AM"] }
    ],
    timeZone: "IST (Indian Standard Time)",
    supportEmail: "wellness@nutriomfit.com",
    supportWhatsApp: "+919876543213",
    isActive: true,
    showBookButton: true,
    icon: "Droplets",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
];

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const stored = localStorage.getItem("services_data");
    return stored ? JSON.parse(stored) : defaultServices;
  });

  useEffect(() => {
    localStorage.setItem("services_data", JSON.stringify(services));
  }, [services]);

  const addService = (service: Omit<Service, "id">) => {
    const newService: Service = {
      ...service,
      id: `service-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleServiceStatus = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const getServiceById = (id: string) => {
    return services.find((s) => s.id === id);
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        getServiceById,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within ServicesProvider");
  }
  return context;
};
