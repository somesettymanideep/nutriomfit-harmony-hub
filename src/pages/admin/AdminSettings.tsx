import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, X, Save, Clock, IndianRupee, Calendar } from "lucide-react";
import { getConsultationSettings, saveConsultationSettings, ConsultationSettings } from "@/lib/adminStore";
import { toast } from "sonner";

const AdminSettings = () => {
  const [settings, setSettings] = useState<ConsultationSettings>(getConsultationSettings());
  const [newSlot, setNewSlot] = useState("");

  const handleSave = () => {
    saveConsultationSettings(settings);
    toast.success("Settings saved successfully");
  };

  const addTimeSlot = () => {
    if (newSlot.trim() && !settings.timeSlots.includes(newSlot.trim())) {
      setSettings({
        ...settings,
        timeSlots: [...settings.timeSlots, newSlot.trim()]
      });
      setNewSlot("");
    }
  };

  const removeTimeSlot = (index: number) => {
    setSettings({
      ...settings,
      timeSlots: settings.timeSlots.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Consultation Settings</h1>
        <p className="text-muted-foreground">Configure consultation fee, duration, and time slots</p>
      </div>

      {/* Fee & Duration */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <IndianRupee size={20} className="text-primary" />
            Fee & Duration
          </CardTitle>
          <CardDescription>Set the consultation pricing and session length</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Consultation Fee</Label>
              <Input
                value={settings.fee}
                onChange={(e) => setSettings({ ...settings, fee: e.target.value })}
                placeholder="e.g., ₹999"
              />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                value={settings.duration}
                onChange={(e) => setSettings({ ...settings, duration: e.target.value })}
                placeholder="e.g., 30-45 minutes"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock size={20} className="text-primary" />
            Working Hours
          </CardTitle>
          <CardDescription>Display hours for weekdays and weekends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Weekday Hours</Label>
              <Input
                value={settings.weekdayHours}
                onChange={(e) => setSettings({ ...settings, weekdayHours: e.target.value })}
                placeholder="e.g., Mon-Fri: 10:00 AM - 6:00 PM"
              />
            </div>
            <div className="space-y-2">
              <Label>Weekend Hours</Label>
              <Input
                value={settings.weekendHours}
                onChange={(e) => setSettings({ ...settings, weekendHours: e.target.value })}
                placeholder="e.g., Sat: 10:00 AM - 2:00 PM"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar size={20} className="text-primary" />
            Available Time Slots
          </CardTitle>
          <CardDescription>Manage available booking time slots</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {settings.timeSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg"
              >
                <span className="text-sm text-foreground">{slot}</span>
                <button
                  onClick={() => removeTimeSlot(index)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              placeholder="e.g., 10:00 AM - 10:45 AM"
              onKeyDown={(e) => e.key === 'Enter' && addTimeSlot()}
            />
            <Button onClick={addTimeSlot} variant="outline">
              <Plus size={18} className="mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save size={18} className="mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
