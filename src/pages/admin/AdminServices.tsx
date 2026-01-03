import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Pencil, Trash2, Heart, Apple, Baby, Droplets, RotateCcw } from "lucide-react";
import { getAllServices, addService, updateService, deleteService, resetServicesToDefault, ServiceItem } from "@/lib/adminStore";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  heart: Heart,
  apple: Apple,
  baby: Baby,
  droplets: Droplets,
};

const AdminServices = () => {
  const [services, setServices] = useState<ServiceItem[]>(getAllServices());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    description: string;
    features: string;
    benefits: string;
    whoIsFor: string;
    duration: string;
    iconType: "heart" | "apple" | "baby" | "droplets";
  }>({
    title: "",
    subtitle: "",
    description: "",
    features: "",
    benefits: "",
    whoIsFor: "",
    duration: "",
    iconType: "heart",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      features: "",
      benefits: "",
      whoIsFor: "",
      duration: "",
      iconType: "heart",
    });
    setEditingService(null);
  };

  const refreshServices = () => {
    setServices(getAllServices());
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const serviceData = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      features: formData.features.split("\n").filter(f => f.trim()),
      benefits: formData.benefits.split("\n").filter(b => b.trim()),
      whoIsFor: formData.whoIsFor,
      duration: formData.duration,
      iconType: formData.iconType,
    };

    if (editingService) {
      updateService(editingService.id, serviceData);
      toast.success("Service updated successfully");
    } else {
      addService(serviceData);
      toast.success("Service added successfully");
    }

    refreshServices();
    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      subtitle: service.subtitle || "",
      description: service.description || "",
      features: (service.features || []).join("\n"),
      benefits: (service.benefits || []).join("\n"),
      whoIsFor: service.whoIsFor || "",
      duration: service.duration || "",
      iconType: service.iconType,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteService(id);
    refreshServices();
    toast.success("Service deleted successfully");
  };

  const handleResetToDefault = () => {
    resetServicesToDefault();
    refreshServices();
    toast.success("Services reset to default");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RotateCcw size={16} className="mr-2" />
                Reset to Default
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Services?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all services to their original default state. All custom changes will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetToDefault}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={18} className="mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Edit Service" : "Add New Service"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Service title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Short tagline"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Features (one per line)</Label>
                    <Textarea
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Benefits (one per line)</Label>
                    <Textarea
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Who It's For</Label>
                  <Textarea
                    value={formData.whoIsFor}
                    onChange={(e) => setFormData({ ...formData, whoIsFor: e.target.value })}
                    placeholder="Target audience description"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 4 weeks"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select
                      value={formData.iconType}
                      onValueChange={(value: "heart" | "apple" | "baby" | "droplets") => 
                        setFormData({ ...formData, iconType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heart">Heart (Wellness)</SelectItem>
                        <SelectItem value="apple">Apple (Nutrition)</SelectItem>
                        <SelectItem value="baby">Baby (Kids)</SelectItem>
                        <SelectItem value="droplets">Droplets (Cleanse)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingService ? "Update" : "Add"} Service
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* All Services */}
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = iconMap[service.iconType];
          return (
            <Card key={service.id} className="border-border">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground truncate">{service.title}</h4>
                    {service.isDefault && (
                      <Badge variant="secondary" className="text-xs flex-shrink-0">Default</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {service.subtitle || service.duration || "No description"}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(service)}
                    title="Edit service"
                  >
                    <Pencil size={16} />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        title="Delete service"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Service?</AlertDialogTitle>
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found. Add your first service or reset to defaults.</p>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
