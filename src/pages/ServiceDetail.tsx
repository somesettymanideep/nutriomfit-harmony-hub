import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getAllServices, ServiceItem, addBooking } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  Apple,
  Baby,
  Droplets,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  AlertCircle,
  Trophy,
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const iconMap = {
  heart: Heart,
  apple: Apple,
  baby: Baby,
  droplets: Droplets,
} as const;

const colorMap: Record<string, { color: string; iconBg: string; iconColor: string }> = {
  heart: { color: "from-pink-500/20 to-rose-500/20", iconBg: "bg-rose-500/10", iconColor: "text-rose-500" },
  apple: { color: "from-primary/20 to-emerald-500/20", iconBg: "bg-primary/10", iconColor: "text-primary" },
  baby: { color: "from-amber-500/20 to-orange-500/20", iconBg: "bg-amber-500/10", iconColor: "text-amber-500" },
  droplets: { color: "from-blue-500/20 to-cyan-500/20", iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
};

// Sample video testimonials - can be replaced with actual videos
const sampleVideos = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    title: "Weight Loss Transformation Journey",
    duration: "3:45",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
    title: "Pregnancy Yoga Success Story",
    duration: "4:20",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
    title: "Hormonal Balance Results",
    duration: "2:55",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=225&fit=crop",
    title: "Kids Yoga Benefits",
    duration: "3:10",
  },
];

const procedureSteps = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "We start with a comprehensive assessment of your health goals, medical history, and lifestyle to create a personalized plan.",
  },
  {
    step: 2,
    title: "Personalized Program Design",
    description: "Based on your assessment, we design a tailored wellness program that addresses your specific needs and objectives.",
  },
  {
    step: 3,
    title: "Guided Sessions",
    description: "Regular one-on-one or group sessions with expert guidance to ensure proper form, progress, and motivation.",
  },
  {
    step: 4,
    title: "Progress Tracking",
    description: "Continuous monitoring and adjustments to your program based on your progress and feedback.",
  },
  {
    step: 5,
    title: "Sustainable Results",
    description: "We focus on creating lasting habits and provide ongoing support for long-term wellness maintenance.",
  },
];

const defaultServicesData = [
  {
    id: "women-wellness",
    title: "Women Wellness Program",
    subtitle: "Holistic Health for Modern Women",
    description: "A comprehensive wellness program designed specifically for women, combining therapeutic yoga with progressive strength training.",
    features: [
      "Therapeutic yoga following IAYT approach",
      "Theme-based sessions",
      "Pranayama and meditation practices",
      "Core strengthening with progressive overload",
    ],
    benefits: ["Improved hormonal balance", "Increased strength", "Better stress management", "Greater body awareness"],
    whoIsFor: "Women seeking holistic wellness and hormonal balance.",
    duration: "Ongoing monthly program",
    iconType: "heart",
  },
  {
    id: "diet-program",
    title: "90-Day Diet Program",
    subtitle: "The 111-Day Transformation Model",
    description: "A scientifically designed nutrition program using the innovative Cognitive Plating Method.",
    features: ["Personalized diet", "Cognitive Plating Method", "4 cycles of 21 days", "Regular check-ins"],
    benefits: ["Sustainable weight loss", "Improved metabolic health", "Better energy levels"],
    whoIsFor: "Anyone seeking lasting weight management.",
    duration: "111 days",
    iconType: "apple",
  },
  {
    id: "kids-yoga",
    title: "Kids Yoga",
    subtitle: "Ages 7-14: Learn, Play, Grow",
    description: "A fun, educational yoga program that teaches children about their bodies through anatomy-based learning.",
    features: ["Anatomy-based learning", "Yogic chants", "Age-appropriate pranayama", "Reward system"],
    benefits: ["Improved coordination", "Better focus", "Emotional regulation"],
    whoIsFor: "Children aged 7-14.",
    duration: "Ongoing weekly sessions",
    iconType: "baby",
  },
  {
    id: "gut-reset",
    title: "LSP + Juice Fasting",
    subtitle: "4-Day Gut Reset Program",
    description: "A supervised gut cleansing protocol combining Laghu Shankha Prakshalana with monitored juice fasting.",
    features: ["LSP cleansing", "Monitored juice fasting", "Medical review", "Post-program guidance"],
    benefits: ["Complete digestive reset", "Toxin elimination", "Mental clarity"],
    whoIsFor: "Adults seeking deep digestive cleansing.",
    duration: "4 days",
    iconType: "droplets",
  },
];

type IconType = keyof typeof iconMap;

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { toast } = useToast();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const [service, setService] = useState<{
    id: string;
    icon: typeof Heart;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    benefits: string[];
    whoIsFor: string;
    duration: string;
    iconBg: string;
    iconColor: string;
  } | null>(null);

  useEffect(() => {
    const adminServices = getAllServices();
    const foundService = adminServices.find((s) => s.id === serviceId) || 
                        defaultServicesData.find((s) => s.id === serviceId);
    
    if (foundService) {
      const iconType = (foundService as ServiceItem).iconType as IconType || "heart";
      const colors = colorMap[iconType] || colorMap.heart;
      const Icon = iconMap[iconType] || Heart;
      
      setService({
        id: foundService.id,
        icon: Icon,
        title: foundService.title,
        subtitle: foundService.subtitle || "",
        description: foundService.description || "",
        features: foundService.features || [],
        benefits: foundService.benefits || [],
        whoIsFor: foundService.whoIsFor || "",
        duration: foundService.duration || "",
        ...colors,
      });
    }
  }, [serviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addBooking({
      serviceName: service?.title || "General Consultation",
      serviceId: service?.id || "",
      name: formData.name,
      email: formData.email,
      whatsapp: formData.phone,
      timeSlot: formData.preferredDate || "To be scheduled",
    });

    toast({
      title: "Consultation Booked!",
      description: "We'll contact you shortly to confirm your appointment.",
    });

    setFormData({ name: "", email: "", phone: "", preferredDate: "", message: "" });
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % sampleVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + sampleVideos.length) % sampleVideos.length);
  };

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <Layout>
      <PageBanner
        badge={service.subtitle}
        title={service.title}
        highlight=""
        description={service.description}
        icon={<Sparkles size={16} />}
      />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/services">
            <ArrowLeft size={18} />
            Back to All Services
          </Link>
        </Button>
      </div>

      {/* Service Overview */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features & Benefits */}
            <div className="space-y-8">
              <div className="p-8 bg-card rounded-2xl border border-border shadow-card">
                <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={24} />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-card rounded-2xl border border-border shadow-card">
                <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                  <Trophy className="text-primary" size={24} />
                  Benefits
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Sparkles size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-6 bg-accent/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={20} className="text-primary" />
                    <span className="font-display font-semibold text-foreground">Who It's For</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.whoIsFor}</p>
                </div>
                <div className="p-6 bg-accent/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={20} className="text-primary" />
                    <span className="font-display font-semibold text-foreground">Duration</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.duration}</p>
                </div>
              </div>
            </div>

            {/* Video Slider */}
            <div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                <Play className="text-primary" size={24} />
                Success Stories
              </h3>
              
              <div className="relative">
                {/* Main Video */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-4">
                  <img
                    src={sampleVideos[currentVideoIndex].thumbnail}
                    alt={sampleVideos[currentVideoIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
                      <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-primary-foreground font-medium text-lg drop-shadow-lg">
                      {sampleVideos[currentVideoIndex].title}
                    </p>
                    <p className="text-primary-foreground/80 text-sm">{sampleVideos[currentVideoIndex].duration}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevVideo}
                    className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="flex gap-2">
                    {sampleVideos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentVideoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentVideoIndex ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextVideo}
                    className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {sampleVideos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentVideoIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procedure Steps */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Our <span className="text-gradient-primary">Process</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {procedureSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="flex gap-6 p-6 bg-card rounded-2xl border border-border shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Book Your <span className="text-gradient-primary">Consultation</span>
              </h2>
              <p className="text-muted-foreground">
                Ready to start your wellness journey? Fill out the form below and we'll get in touch with you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 bg-card rounded-2xl border border-border shadow-card space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your wellness goals..."
                  rows={4}
                />
              </div>

              <Button type="submit" variant="cta" size="lg" className="w-full group">
                Book Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-center text-muted-foreground text-sm">
                By submitting, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
