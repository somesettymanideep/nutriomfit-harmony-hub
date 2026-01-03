import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useServices } from "@/contexts/ServicesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Clock,
  IndianRupee,
  Calendar,
  Shield,
  Mail,
  MessageCircle,
  Globe,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+61", country: "Australia" },
];

const ServiceBooking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { getServiceById } = useServices();
  const service = getServiceById(serviceId || "");

  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    whatsapp: "",
    email: "",
    preferredSlot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  if (!service) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Button asChild>
              <Link to="/services">Back to Services</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const allSlots = service.timeSlots.flatMap((ts) =>
    ts.slots.map((slot) => `${ts.day}: ${slot}`)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp || !formData.preferredSlot) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsBooked(true);
    toast.success("Consultation booked successfully!");
  };

  if (isBooked) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-20">
          <Card className="max-w-md w-full mx-4 text-center shadow-elegant">
            <CardContent className="pt-8 pb-8">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Booking Confirmed!
              </h2>
              <p className="text-muted-foreground mb-6">
                Thank you for booking a consultation for <strong>{service.title}</strong>. 
                We'll contact you shortly on WhatsApp to confirm your appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/services">View Other Services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-secondary/30 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </Button>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left: Procedure Details */}
            <Card className="shadow-elegant border-border h-fit">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-display text-2xl flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                    <span className={service.iconColor}>●</span>
                  </div>
                  Procedure Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Rich Content */}
                <div 
                  className="prose prose-sm max-w-none text-foreground/80 [&>h3]:font-display [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:text-lg [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:space-y-1 [&>ul]:list-disc [&>ul]:pl-5 [&>p.warning]:bg-amber-500/10 [&>p.warning]:border [&>p.warning]:border-amber-500/30 [&>p.warning]:p-3 [&>p.warning]:rounded-lg [&>p.warning]:text-amber-700"
                  dangerouslySetInnerHTML={{ __html: service.detailedProcedure }}
                />

                {/* Warning Notice */}
                <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80">
                    <strong>Note:</strong> No personalized diet/workout plans will be shared during this consultation. 
                    This session is for understanding your needs and program suitability.
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{service.consultationDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Consultation Fee (Non-refundable)</p>
                      <p className="font-medium text-foreground">₹{service.consultationFee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rescheduling</p>
                      <p className="font-medium text-foreground">Free rescheduling up to 24 hours before</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Confidentiality</p>
                      <p className="font-medium text-foreground">All information kept strictly confidential</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time Zone</p>
                      <p className="font-medium text-foreground">{service.timeZone}</p>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-foreground">Available Slots</h4>
                  {service.timeSlots.map((ts) => (
                    <div key={ts.day} className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground w-20">{ts.day}:</span>
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

                {/* Support */}
                <div className="pt-4 border-t border-border space-y-3">
                  <h4 className="font-display font-semibold text-foreground">Need Help?</h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${service.supportEmail}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      <Mail size={16} />
                      {service.supportEmail}
                    </a>
                    <a
                      href={`https://wa.me/${service.supportWhatsApp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-lg text-sm text-emerald-600 hover:bg-emerald-500/20 transition-colors"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: Booking Form */}
            <Card className="shadow-elegant border-border h-fit sticky top-24">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-display text-2xl">Book Consultation</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  Fill in your details to schedule a consultation
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((cc) => (
                            <SelectItem key={cc.code} value={cc.code}>
                              {cc.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="9876543210"
                        required
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slot">Preferred Time Slot *</Label>
                    <Select
                      value={formData.preferredSlot}
                      onValueChange={(value) => setFormData({ ...formData, preferredSlot: value })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {allSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : `Pay ₹${service.consultationFee} & Book`}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full"
                      asChild
                    >
                      <Link to="/">Back to Home</Link>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    By booking, you agree to our terms of service and privacy policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceBooking;
