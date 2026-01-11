import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  getScheduleTwoData, 
  saveScheduleTwoData, 
  ScheduleTwoData,
  resetScheduleTwoToDefault 
} from "@/lib/scheduleTwoStore";
import { Upload, Save, RotateCcw, Image, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const AdminScheduleTwo = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleTwoData>(getScheduleTwoData());
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setScheduleData(getScheduleTwoData());
  }, []);

  const handleInputChange = (field: keyof ScheduleTwoData, value: string | number) => {
    setScheduleData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleClassCountChange = (key: 'count1' | 'count2' | 'count3', value: number) => {
    setScheduleData(prev => ({
      ...prev,
      classCounts: { ...prev.classCounts, [key]: value }
    }));
    setHasChanges(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setScheduleData(prev => ({ ...prev, calendarImage: base64 }));
      setHasChanges(true);
      toast({
        title: "Image uploaded",
        description: "Calendar image has been uploaded. Click Save to apply.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveScheduleTwoData(scheduleData);
    setHasChanges(false);
    toast({
      title: "Schedule saved",
      description: "Schedule Two settings have been updated successfully.",
    });
  };

  const handleReset = () => {
    resetScheduleTwoToDefault();
    setScheduleData(getScheduleTwoData());
    setHasChanges(false);
    toast({
      title: "Schedule reset",
      description: "Schedule Two has been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Schedule Two</h1>
          <p className="text-muted-foreground">Manage the image-based monthly calendar</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/schedule-two" target="_blank">
              <Eye size={16} className="mr-2" />
              Preview
            </Link>
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw size={16} className="mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image size={20} />
              Calendar Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {scheduleData.calendarImage ? (
                <div className="space-y-4">
                  <img 
                    src={scheduleData.calendarImage} 
                    alt="Calendar Preview" 
                    className="max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-muted-foreground">Click to replace image</p>
                </div>
              ) : (
                <div className="py-8">
                  <Upload size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground">Upload Calendar Image</p>
                  <p className="text-sm text-muted-foreground">Click or drag and drop</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {scheduleData.calendarImage && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  setScheduleData(prev => ({ ...prev, calendarImage: null }));
                  setHasChanges(true);
                }}
              >
                Remove Image
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <div className="space-y-6">
          {/* Month & Timings */}
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="month">Month Title</Label>
                <Input
                  id="month"
                  value={scheduleData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  placeholder="e.g., JAN 2026"
                />
              </div>
              <div>
                <Label htmlFor="weekdayTimings">Weekday Timings</Label>
                <Input
                  id="weekdayTimings"
                  value={scheduleData.weekdayTimings}
                  onChange={(e) => handleInputChange('weekdayTimings', e.target.value)}
                  placeholder="e.g., MON-FRI 6 AM & 6.15 PM"
                />
              </div>
              <div>
                <Label htmlFor="weekendTimings">Weekend Timings</Label>
                <Input
                  id="weekendTimings"
                  value={scheduleData.weekendTimings}
                  onChange={(e) => handleInputChange('weekendTimings', e.target.value)}
                  placeholder="e.g., SAT & SUN ONLY 7.30 AM"
                />
              </div>
            </CardContent>
          </Card>

          {/* Class Counts */}
          <Card>
            <CardHeader>
              <CardTitle>Class Count Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="count1">Badge 1 (Gold)</Label>
                  <Input
                    id="count1"
                    type="number"
                    value={scheduleData.classCounts.count1}
                    onChange={(e) => handleClassCountChange('count1', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="count2">Badge 2 (Silver)</Label>
                  <Input
                    id="count2"
                    type="number"
                    value={scheduleData.classCounts.count2}
                    onChange={(e) => handleClassCountChange('count2', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="count3">Badge 3 (Gold)</Label>
                  <Input
                    id="count3"
                    type="number"
                    value={scheduleData.classCounts.count3}
                    onChange={(e) => handleClassCountChange('count3', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminScheduleTwo;
