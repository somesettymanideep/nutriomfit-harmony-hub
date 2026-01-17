import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Trash2, Link as LinkIcon, ImageIcon, Heart, Apple, Baby, Droplets } from "lucide-react";
import { getAllServices, ServiceItem } from "@/lib/adminStore";
import {
  getServiceTestimonialImages,
  addImageToService,
  removeImageFromService,
} from "@/lib/serviceTestimonialImagesStore";
import { toast } from "sonner";

const iconMap = {
  heart: Heart,
  apple: Apple,
  baby: Baby,
  droplets: Droplets,
};

const AdminServiceImages = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    const loadedServices = getAllServices();
    setServices(loadedServices);
    if (loadedServices.length > 0 && !selectedServiceId) {
      setSelectedServiceId(loadedServices[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedServiceId) {
      refreshImages();
    }
  }, [selectedServiceId]);

  const refreshImages = () => {
    const storedImages = getServiceTestimonialImages(selectedServiceId);
    setImages([...storedImages]);
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(newImageUrl);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    addImageToService(selectedServiceId, newImageUrl.trim());
    refreshImages();
    setNewImageUrl("");
    toast.success("Image added successfully");
  };

  const handleRemoveImage = (index: number) => {
    removeImageFromService(selectedServiceId, index);
    refreshImages();
    toast.success("Image removed successfully");
  };

  const selectedService = services.find(s => s.id === selectedServiceId);
  const SelectedIcon = selectedService ? iconMap[selectedService.iconType] : Heart;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Client Testimonial Images</h1>
        <p className="text-muted-foreground">Manage transformation images for each service</p>
      </div>

      {/* Service Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Service</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
            <SelectTrigger className="w-full sm:w-80">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => {
                const Icon = iconMap[service.iconType];
                return (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-primary" />
                      <span>{service.title}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedServiceId && (
        <>
          {/* Add New Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <SelectedIcon size={20} className="text-primary" />
                Add Image for {selectedService?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="imageUrl" className="sr-only">Image URL</Label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="imageUrl"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Paste image URL here..."
                      className="pl-9"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddImage();
                        }
                      }}
                    />
                  </div>
                </div>
                <Button onClick={handleAddImage}>
                  <Plus size={16} className="mr-2" />
                  Add Image
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Add transformation photos, before/after images, or client success stories for this service.
              </p>
            </CardContent>
          </Card>

          {/* Images Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedService?.title} Images ({images.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No images added yet for this service.</p>
                  <p className="text-sm">Add your first client testimonial image above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-border">
                        <img
                          src={imageUrl}
                          alt={`Testimonial ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this image? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveImage(index)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <p className="text-xs text-muted-foreground mt-1 truncate" title={imageUrl}>
                        {imageUrl}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminServiceImages;
