import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Video, Upload } from "lucide-react";
import { toast } from "sonner";
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
import {
  getHomeVideoTestimonials,
  addHomeVideoTestimonial,
  deleteHomeVideoTestimonial,
  HomeVideoTestimonial
} from "@/lib/homeVideoTestimonialsStore";

const AdminHomeVideos = () => {
  const [videos, setVideos] = useState<HomeVideoTestimonial[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setVideos(getHomeVideoTestimonials());
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        toast.error("Please select a video file");
        return;
      }
      setSelectedFile(file);
      setVideoUrl(""); // Clear URL when file is selected
    }
  };

  const handleAddVideo = () => {
    if (!selectedFile && !videoUrl.trim()) {
      toast.error("Please upload a video file or enter a video URL");
      return;
    }
    if (!serviceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    let finalVideoUrl = videoUrl.trim();

    // If file is selected, convert to base64 data URL
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        addHomeVideoTestimonial({
          videoUrl: base64Url,
          serviceName: serviceName.trim()
        });
        
        setVideoUrl("");
        setServiceName("");
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        refreshData();
        toast.success("Video added successfully");
      };
      reader.readAsDataURL(selectedFile);
    } else {
      addHomeVideoTestimonial({
        videoUrl: finalVideoUrl,
        serviceName: serviceName.trim()
      });

      setVideoUrl("");
      setServiceName("");
      refreshData();
      toast.success("Video added successfully");
    }
  };

  const handleDelete = (id: string) => {
    deleteHomeVideoTestimonial(id);
    refreshData();
    toast.success("Video deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Home Video Testimonials</h1>
        <p className="text-muted-foreground">Manage video testimonials displayed on the homepage</p>
      </div>

      {/* Add Video Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name</Label>
            <Input
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="e.g., 90-Day Diet Program"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Upload Video File</Label>
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="videoFile"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Choose Video File
              </Button>
              {selectedFile && (
                <span className="text-sm text-muted-foreground">
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              placeholder="https://... (YouTube, Vimeo, or direct video URL)"
              disabled={!!selectedFile}
            />
          </div>

          <Button onClick={handleAddVideo} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Video
          </Button>
        </CardContent>
      </Card>

      {/* Videos List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Current Videos ({videos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {videos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No videos added yet. Add your first video above.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative group rounded-lg overflow-hidden border border-border bg-muted"
                >
                  <div className="aspect-video flex items-center justify-center">
                    <Video className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                    <span className="inline-block px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded">
                      {video.serviceName}
                    </span>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Video?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove the video from the homepage testimonials section.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(video.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomeVideos;
