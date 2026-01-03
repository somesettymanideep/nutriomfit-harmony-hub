import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  IndianRupee,
  Calendar,
  Shield,
  Globe,
  Phone,
  CheckCircle2,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import { getConsultationSettings, addBooking } from "@/lib/adminStore";
import { toast } from "sonner";

interface BookConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName?: string;
  serviceId?: string;
}

const BookConsultationModal = ({
  open,
  onOpenChange,
  serviceName,
  serviceId,
}: BookConsultationModalProps) => {
  const settings = getConsultationSettings();
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    timeSlot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.timeSlot) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    addBooking({
      name: formData.name.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim(),
      timeSlot: formData.timeSlot,
      serviceId,
      serviceName,
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setFormData({ name: "", whatsapp: "", email: "", timeSlot: "" });
      setIsSuccess(false);
    }, 300);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you, {formData.name}! Your consultation has been booked for{" "}
              <span className="font-medium text-foreground">{formData.timeSlot}</span>.
              We'll contact you on WhatsApp shortly.
            </p>
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Procedure Details */}
          <div className="bg-secondary/50 p-6 md:p-8 border-r border-border">
            <DialogHeader className="mb-6">
              <DialogTitle className="font-display text-2xl">
                Procedure Details
              </DialogTitle>
            </DialogHeader>

            <p className="text-muted-foreground mb-6">
              Book a one-on-one consultation with our wellness expert to discuss your 
              health goals, assess your current condition, and create a personalized 
              wellness plan tailored to your needs.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Consultation Duration</p>
                  <p className="text-sm text-muted-foreground">{settings.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Fee</p>
                  <p className="text-sm text-muted-foreground">{settings.fee} (Non-refundable)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Rescheduling</p>
                  <p className="text-sm text-muted-foreground">Must be done 24 hours prior to appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Confidentiality</p>
                  <p className="text-sm text-muted-foreground">All consultations are strictly confidential</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Time Zone</p>
                  <p className="text-sm text-muted-foreground">All times are in Indian Standard Time (IST)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-card rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Available Hours</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{settings.weekdayHours}</p>
                <p>{settings.weekendHours}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone size={14} />
              <span>Support: +91 98765 43210</span>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Book Your Consultation
            </h3>

            {serviceName && (
              <div className="mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">Selected Program:</p>
                <p className="font-medium text-foreground">{serviceName}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User size={14} />
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="flex items-center gap-2">
                  <MessageSquare size={14} />
                  WhatsApp Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                />
                <p className="text-xs text-muted-foreground">Include country code</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail size={14} />
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot" className="flex items-center gap-2">
                  <Clock size={14} />
                  Preferred Time Slot <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.timeSlot}
                  onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {settings.timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      Pay {settings.fee} & Book
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  By booking, you agree to our terms and conditions
                </p>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookConsultationModal;
