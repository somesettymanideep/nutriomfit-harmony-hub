import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useServices } from "@/contexts/ServicesContext";
import {
  Heart,
  Apple,
  Baby,
  Droplets,
  Dumbbell,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  AlertCircle,
  Calendar,
  Trophy,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Apple,
  Baby,
  Droplets,
  Dumbbell,
  Leaf,
};

const Services = () => {
  const { services } = useServices();
  const activeServices = services.filter((s) => s.isActive);

  return (
    <Layout>
      <PageBanner
        badge="Our Programs"
        title="Transformative Wellness"
        highlight="Programs"
        description="Discover our range of holistic programs designed to nurture your body, calm your mind, and elevate your overall well-being. Each program is crafted with science, tradition, and personalized care."
        icon={<Sparkles size={16} />}
      />

      {/* Services */}
      {activeServices.map((service, index) => {
        const IconComponent = iconMap[service.icon] || Heart;
        
        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-20 ${index % 2 === 0 ? "bg-background" : "bg-secondary/30"}`}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                  <div className={`w-20 h-20 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
                    <IconComponent size={40} className={service.iconColor} />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">{service.shortDescription}</p>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Duration */}
                  <div className="p-6 bg-accent/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={20} className="text-primary" />
                      <span className="font-display font-semibold text-foreground">Duration</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{service.consultationDuration}</p>
                  </div>

                  {/* Fee */}
                  <div className="p-6 bg-accent/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy size={20} className="text-primary" />
                      <span className="font-display font-semibold text-foreground">Consultation Fee</span>
                    </div>
                    <p className="text-muted-foreground text-sm">₹{service.consultationFee}</p>
                  </div>

                  {/* Time Zone */}
                  <div className="p-6 bg-accent/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={20} className="text-primary" />
                      <span className="font-display font-semibold text-foreground">Time Zone</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{service.timeZone}</p>
                  </div>

                  {/* CTA */}
                  {service.showBookButton && (
                    <div className="p-6 bg-primary/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={20} className="text-primary" />
                        <span className="font-display font-semibold text-foreground">Get Started</span>
                      </div>
                      <Button variant="default" size="sm" className="w-full" asChild>
                        <Link to={`/services/${service.id}/book`}>Book Consultation</Link>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Available Slots */}
                <div className="p-6 bg-card rounded-xl border border-border shadow-card mb-8">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" size={20} />
                    Available Time Slots
                  </h3>
                  <div className="space-y-3">
                    {service.timeSlots.map((ts) => (
                      <div key={ts.day} className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground w-24">{ts.day}:</span>
                        <div className="flex flex-wrap gap-2">
                          {ts.slots.map((slot) => (
                            <span key={slot} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {activeServices.length === 0 && (
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">No Services Available</h2>
            <p className="text-muted-foreground">Please check back later for our wellness programs.</p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Not Sure Which Program is Right for You?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Book a free consultation and let us help you find the perfect wellness 
              program tailored to your unique needs and goals.
            </p>
            <Button
              variant="secondary"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-lg"
              asChild
            >
              <Link to="/contact" className="group">
                Book Free Consultation
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
