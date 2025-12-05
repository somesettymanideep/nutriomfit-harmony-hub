import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const programs = [
  { value: "women-wellness", label: "Women Wellness Program" },
  { value: "diet-program", label: "90-Day Diet Program" },
  { value: "kids-yoga", label: "Kids Yoga (Ages 7-14)" },
  { value: "gut-reset", label: "LSP + Juice Fasting" },
  { value: "general", label: "General Inquiry" },
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+91 XXXXX XXXXX",
    action: "tel:+91XXXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@nutriomfit.com",
    action: "mailto:hello@nutriomfit.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "India",
    action: null,
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Sat: 6 AM - 8 PM",
    action: null,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });

    setFormData({
      name: "",
      phone: "",
      email: "",
      program: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles size={16} />
              Contact Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              We're Here to Guide Your{" "}
              <span className="text-gradient-primary">Wellness Journey</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have questions about our programs? Want to book a consultation? 
              We'd love to hear from you. Reach out and let's start your 
              transformation together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground">
                  Ready to start your wellness journey? Reach out for program 
                  enrollment, free consultations, or any questions you may have.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-medium text-foreground">{info.title}</p>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <div className="pt-4">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full gap-2"
                  asChild
                >
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="p-8 bg-card rounded-2xl border border-border shadow-card">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Your Name *
                      </label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Phone Number *
                      </label>
                      <Input
                        placeholder="Enter your phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Select Program
                    </label>
                    <Select
                      value={formData.program}
                      onValueChange={(value) =>
                        setFormData({ ...formData, program: value })
                      }
                    >
                      <SelectTrigger className="h-12 bg-background">
                        <SelectValue placeholder="Choose a program" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Your Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your wellness goals..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Call CTA */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Prefer to Talk?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Book a free consultation call with our wellness experts. We'll discuss 
            your goals and recommend the best program for your needs.
          </p>
          <Button variant="cta" size="xl">
            <Phone size={20} />
            Book Your Free Call
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
