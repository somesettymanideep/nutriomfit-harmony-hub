import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Video } from "lucide-react";
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
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setVideos(getHomeVideoTestimonials());
  };

  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }
    if (!thumbnailUrl.trim()) {
      toast.error("Please enter a thumbnail URL");
      return;
    }
    if (!serviceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    addHomeVideoTestimonial({
      videoUrl: videoUrl.trim(),
      thumbnail: thumbnailUrl.trim(),
      serviceName: serviceName.trim()
    });

    setVideoUrl("");
    setThumbnailUrl("");
    setServiceName("");
    refreshData();
    toast.success("Video added successfully");
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
          <div className="grid md:grid-cols-3 gap-4">
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
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
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
                  className="relative group rounded-lg overflow-hidden border border-border"
                >
                  <div className="aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.serviceName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
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
