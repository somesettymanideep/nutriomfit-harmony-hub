import { useState, useEffect, useRef } from "react";
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
import { Upload, Trash2, Video, Play, FileVideo, AlertCircle } from "lucide-react";
import { 
  getAllServiceVideos, 
  addServiceVideo, 
  deleteServiceVideo, 
  validateVideoFile,
  fileToBase64,
  generateVideoThumbnail,
  getVideoDuration,
  ServiceVideo 
} from "@/lib/serviceVideoStore";
import { getAllServices, ServiceItem } from "@/lib/adminStore";
import { toast } from "sonner";

const AdminServiceVideos = () => {
  const [videos, setVideos] = useState<ServiceVideo[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setVideos(getAllServiceVideos());
    setServices(getAllServices());
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateVideoFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    if (!selectedService) {
      toast.error("Please select a service first");
      return;
    }

    if (!videoTitle.trim()) {
      toast.error("Please enter a video title");
      return;
    }

    setUploading(true);

    try {
      // Convert file to base64
      const videoData = await fileToBase64(file);
      
      // Generate thumbnail and duration
      const [thumbnail, duration] = await Promise.all([
        generateVideoThumbnail(videoData),
        getVideoDuration(videoData)
      ]);

      // Save video
      addServiceVideo(selectedService, videoTitle.trim(), videoData, thumbnail, duration);
      
      toast.success("Video uploaded successfully!");
      setVideoTitle("");
      setSelectedService("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      refreshData();
    } catch (error) {
      toast.error("Failed to upload video. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (videoId: string) => {
    deleteServiceVideo(videoId);
    refreshData();
    toast.success("Video deleted successfully");
  };

  const getServiceTitle = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.title || serviceId;
  };

  // Group videos by service
  const videosByService = videos.reduce((acc, video) => {
    if (!acc[video.serviceId]) {
      acc[video.serviceId] = [];
    }
    acc[video.serviceId].push(video);
    return acc;
  }, {} as Record<string, ServiceVideo[]>);

  // Only show the 4 main services for upload
  const mainServices = services.filter(s => 
    ['women-wellness', 'diet-program', 'kids-yoga', 'gut-reset'].includes(s.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Service Videos</h1>
        <p className="text-muted-foreground">Upload and manage videos for each service (max 5MB per video)</p>
      </div>

      {/* Upload Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload size={20} className="text-primary" />
            Upload New Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">
              Maximum file size: <strong>5MB</strong>. Supported formats: MP4, WebM, OGG.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Service *</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {mainServices.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Video Title *</Label>
              <Input
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g., Client Transformation Story"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Video File *</Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                onChange={handleFileSelect}
                disabled={uploading || !selectedService || !videoTitle.trim()}
                className="cursor-pointer"
              />
            </div>
            {uploading && (
              <p className="text-sm text-muted-foreground">Uploading and processing video...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Videos by Service */}
      {mainServices.map(service => {
        const serviceVideos = videosByService[service.id] || [];
        
        return (
          <Card key={service.id} className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Video size={20} className="text-primary" />
                  {service.title}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {serviceVideos.length} video{serviceVideos.length !== 1 ? 's' : ''}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {serviceVideos.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  No videos uploaded for this service yet.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceVideos.map(video => (
                    <div key={video.id} className="relative group">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                        {video.thumbnail ? (
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileVideo size={32} className="text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <Play size={18} className="text-primary-foreground ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <div className="mt-2 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{video.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(video.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Video?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{video.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(video.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminServiceVideos;
