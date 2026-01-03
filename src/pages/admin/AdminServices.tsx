import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useServices, Service } from "@/contexts/ServicesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const iconOptions = [
  { value: "Heart", bg: "bg-rose-500/10", color: "text-rose-500" },
  { value: "Apple", bg: "bg-primary/10", color: "text-primary" },
  { value: "Baby", bg: "bg-amber-500/10", color: "text-amber-500" },
  { value: "Droplets", bg: "bg-blue-500/10", color: "text-blue-500" },
  { value: "Dumbbell", bg: "bg-purple-500/10", color: "text-purple-500" },
  { value: "Leaf", bg: "bg-emerald-500/10", color: "text-emerald-500" },
];

const emptyService: Omit<Service, "id"> = {
  title: "",
  shortDescription: "",
  detailedProcedure: "",
  consultationFee: 0,
  consultationDuration: "30 minutes",
  timeSlots: [
    { day: "Weekdays", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Weekends", slots: ["10:00 AM", "12:00 PM"] },
  ],
  timeZone: "IST (Indian Standard Time)",
  supportEmail: "",
  supportWhatsApp: "",
  isActive: true,
  showBookButton: true,
  icon: "Heart",
  iconBg: "bg-rose-500/10",
  iconColor: "text-rose-500",
};

const AdminServices = () => {
  const { services, addService, updateService, deleteService, toggleServiceStatus } = useServices();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Omit<Service, "id">>(emptyService);

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData(emptyService);
    }
    setIsDialogOpen(true);
  };

  const handleIconSelect = (icon: typeof iconOptions[0]) => {
    setFormData({
      ...formData,
      icon: icon.value,
      iconBg: icon.bg,
      iconColor: icon.color,
    });
  };

  const handleTimeSlotsChange = (dayIndex: number, slotsStr: string) => {
    const newSlots = [...formData.timeSlots];
    newSlots[dayIndex] = {
      ...newSlots[dayIndex],
      slots: slotsStr.split(",").map((s) => s.trim()).filter(Boolean),
    };
    setFormData({ ...formData, timeSlots: newSlots });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.shortDescription) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingService) {
      updateService(editingService.id, formData);
      toast.success("Service updated successfully");
    } else {
      addService(formData);
      toast.success("Service added successfully");
    }
    
    setIsDialogOpen(false);
    setEditingService(null);
    setFormData(emptyService);
  };

  const handleDelete = (id: string) => {
    deleteService(id);
    toast.success("Service deleted successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Services Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Add, edit, and manage your consultation services.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus size={20} />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  {editingService ? "Edit Service" : "Add New Service"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Service Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Women Wellness Program"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Textarea
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Brief description for service cards"
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="detailedProcedure">Detailed Procedure (HTML supported)</Label>
                    <Textarea
                      id="detailedProcedure"
                      value={formData.detailedProcedure}
                      onChange={(e) => setFormData({ ...formData, detailedProcedure: e.target.value })}
                      placeholder="<h3>About This Consultation</h3><p>Details...</p>"
                      rows={6}
                    />
                  </div>
                </div>

                {/* Icon Selection */}
                <div>
                  <Label>Icon Style</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon.value}
                        type="button"
                        onClick={() => handleIconSelect(icon)}
                        className={`w-12 h-12 rounded-lg ${icon.bg} flex items-center justify-center border-2 transition-all ${
                          formData.icon === icon.value
                            ? "border-primary scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                      >
                        <span className={`text-xl ${icon.color}`}>●</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fee">Consultation Fee (₹)</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={formData.consultationFee}
                      onChange={(e) => setFormData({ ...formData, consultationFee: Number(e.target.value) })}
                      min={0}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.consultationDuration}
                      onChange={(e) => setFormData({ ...formData, consultationDuration: e.target.value })}
                      placeholder="e.g., 45 minutes"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                  <Label>Time Slots (comma-separated)</Label>
                  {formData.timeSlots.map((slot, index) => (
                    <div key={slot.day} className="grid sm:grid-cols-3 gap-2 items-center">
                      <span className="text-sm font-medium text-muted-foreground">{slot.day}:</span>
                      <Input
                        className="sm:col-span-2"
                        value={slot.slots.join(", ")}
                        onChange={(e) => handleTimeSlotsChange(index, e.target.value)}
                        placeholder="10:00 AM, 2:00 PM, 4:00 PM"
                      />
                    </div>
                  ))}
                </div>

                {/* Contact & Timezone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Input
                      id="timezone"
                      value={formData.timeZone}
                      onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Support Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.supportEmail}
                      onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="whatsapp">Support WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.supportWhatsApp}
                    onChange={(e) => setFormData({ ...formData, supportWhatsApp: e.target.value })}
                    placeholder="+919876543210"
                  />
                </div>

                {/* Toggles */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label>Service Active</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={formData.showBookButton}
                      onCheckedChange={(checked) => setFormData({ ...formData, showBookButton: checked })}
                    />
                    <Label>Show Book Button</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingService ? "Update Service" : "Add Service"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Services List */}
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="border-border shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${service.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-xl ${service.iconColor}`}>●</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-lg text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                        {service.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm">
                        <span className="text-primary font-medium">₹{service.consultationFee}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{service.consultationDuration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.isActive
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-rose-500/10 text-rose-500"
                      }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleServiceStatus(service.id)}
                      title={service.isActive ? "Disable" : "Enable"}
                    >
                      {service.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(service)}
                    >
                      <Pencil size={18} />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Service</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{service.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(service.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {services.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No services yet. Add your first service!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
