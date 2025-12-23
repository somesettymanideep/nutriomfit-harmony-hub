import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AboutContentType {
  badge: string;
  heading: string;
  headingHighlight: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}

const defaultContent: AboutContentType = {
  badge: "About NUTRIOMFIT",
  heading: "A Holistic Approach to",
  headingHighlight: "Wellness",
  description: "At NUTRIOMFIT, we believe true wellness comes from balancing the body, mind, and spirit. Our philosophy blends scientific research with yogic traditions, creating personalized programs that foster sustainable health transformations. We empower individuals with knowledge, body awareness, and practical tools for lifelong vitality.",
  features: [
    {
      title: "Science-Based Wellness",
      description: "Evidence-aware approach combining modern research with ancient wisdom",
    },
    {
      title: "Yogic Tradition",
      description: "Therapeutic yoga following IAYT methodologies for holistic healing",
    },
    {
      title: "Sustainable Changes",
      description: "Focus on long-term transformation over quick fixes",
    },
    {
      title: "Personalized Programs",
      description: "Tailored wellness journeys designed for your unique needs",
    },
  ],
};

interface AboutContentContextType {
  content: AboutContentType;
  updateContent: (newContent: AboutContentType) => void;
  resetContent: () => void;
}

const AboutContentContext = createContext<AboutContentContextType | undefined>(undefined);

const STORAGE_KEY = "about_preview_content";

export const AboutContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<AboutContentType>(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch {
        setContent(defaultContent);
      }
    }
  }, []);

  const updateContent = (newContent: AboutContentType) => {
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AboutContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </AboutContentContext.Provider>
  );
};

export const useAboutContent = () => {
  const context = useContext(AboutContentContext);
  if (!context) {
    throw new Error("useAboutContent must be used within AboutContentProvider");
  }
  return context;
};

export { defaultContent };
