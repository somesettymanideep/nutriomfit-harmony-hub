import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Video, Play, AlertCircle } from "lucide-react";
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
  getHomeVideos,
  addHomeVideo,
  deleteHomeVideo,
  HomeVideo
} from "@/lib/homeVideoSliderStore";

const AdminVideoSlider = () => {
  const [videos, setVideos] = useState<HomeVideo[]>([]);
  const [serviceName, setServiceName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setVideos(getHomeVideos());
  };

  const handleAddVideo = () => {
    if (!serviceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }
    if (!videoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }

    addHomeVideo({
      serviceName: serviceName.trim(),
      videoUrl: videoUrl.trim()
    });

    setServiceName("");
    setVideoUrl("");
    refreshData();
    toast.success("Video added successfully");
  };

  const handleDelete = (id: string) => {
    deleteHomeVideo(id);
    refreshData();
    toast.success("Video deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Home Video Slider</h1>
        <p className="text-muted-foreground">Manage videos displayed in the homepage carousel</p>
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
          <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Video files should be under 25MB. Use direct video URLs (MP4, WebM, etc.) for best compatibility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g., Yoga, Fitness, Nutrition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
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
                  <div className="aspect-video relative bg-muted">
                    <video
                      src={video.videoUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-card">
                    <h3 className="font-medium text-foreground truncate">{video.serviceName}</h3>
                    <p className="text-xs text-muted-foreground truncate mt-1">{video.videoUrl}</p>
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
                          This will remove "{video.serviceName}" video from the homepage video slider.
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

export default AdminVideoSlider;
