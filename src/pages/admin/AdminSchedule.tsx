import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  getScheduleData,
  saveScheduleData,
  resetScheduleToDefault,
  ScheduleData,
  WorkoutType,
  WORKOUT_TYPES,
} from "@/lib/scheduleStore";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
  Clock,
} from "lucide-react";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const workoutColors: Record<WorkoutType, { bg: string; text: string; icon: string }> = {
  yoga: { bg: "bg-cyan-100", text: "text-cyan-700", icon: "🧘" },
  upper_body: { bg: "bg-purple-100", text: "text-purple-700", icon: "💪" },
  abs: { bg: "bg-pink-100", text: "text-pink-700", icon: "🔥" },
  lower_body: { bg: "bg-blue-100", text: "text-blue-700", icon: "🦵" },
  full_body: { bg: "bg-green-100", text: "text-green-700", icon: "⭐" },
  rest: { bg: "bg-gray-100", text: "text-gray-500", icon: "😴" },
};

const AdminSchedule = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>(getScheduleData());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setScheduleData(getScheduleData());
  }, []);

  const { year, month, calendarDays } = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const days = lastDay.getDate();
    const startDay = firstDay.getDay();

    const calendar: { day: number | null; dateKey: string | null; workout: WorkoutType | null }[] = [];

    for (let i = 0; i < startDay; i++) {
      calendar.push({ day: null, dateKey: null, workout: null });
    }

    for (let d = 1; d <= days; d++) {
      const dateKey = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const workout = scheduleData.monthlySchedule[dateKey] || null;
      calendar.push({ day: d, dateKey, workout });
    }

    return { year: y, month: m, calendarDays: calendar };
  }, [currentDate, scheduleData]);

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (dateKey: string | null) => {
    if (dateKey) {
      setSelectedDate(dateKey);
    }
  };

  const handleWorkoutChange = (workout: WorkoutType) => {
    if (!selectedDate) return;
    const updated = {
      ...scheduleData,
      monthlySchedule: {
        ...scheduleData.monthlySchedule,
        [selectedDate]: workout,
      },
    };
    setScheduleData(updated);
  };

  const handleTimingsChange = (field: "weekdayTimings" | "weekendTimings", value: string) => {
    setScheduleData({ ...scheduleData, [field]: value });
  };

  const handleSave = () => {
    saveScheduleData(scheduleData);
    toast({
      title: "Schedule Saved",
      description: "The monthly schedule has been updated successfully.",
    });
  };

  const handleReset = () => {
    resetScheduleToDefault();
    setScheduleData(getScheduleData());
    toast({
      title: "Schedule Reset",
      description: "The schedule has been reset to default.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar size={24} className="text-primary" />
            Schedule Management
          </h1>
          <p className="text-muted-foreground">
            Manage the monthly workout calendar and class timings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw size={16} />
            Reset
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Timings */}
      <div className="grid md:grid-cols-2 gap-6 p-6 bg-card rounded-xl border border-border">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            Weekday Timings
          </Label>
          <Input
            value={scheduleData.weekdayTimings}
            onChange={(e) => handleTimingsChange("weekdayTimings", e.target.value)}
            placeholder="e.g., MON-FRI 6 AM & 6:15 PM"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            Weekend Timings
          </Label>
          <Input
            value={scheduleData.weekendTimings}
            onChange={(e) => handleTimingsChange("weekendTimings", e.target.value)}
            placeholder="e.g., SAT & SUN ONLY 7:30 AM"
          />
        </div>
      </div>

      {/* Legend & Workout Selector */}
      <div className="p-6 bg-card rounded-xl border border-border">
        <h3 className="font-semibold text-foreground mb-4">Workout Types</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {(Object.keys(WORKOUT_TYPES) as WorkoutType[]).map((type) => (
            <div
              key={type}
              className={`px-3 py-2 rounded-lg ${workoutColors[type].bg} ${workoutColors[type].text} flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${
                selectedDate && scheduleData.monthlySchedule[selectedDate] === type
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => selectedDate && handleWorkoutChange(type)}
            >
              <span>{workoutColors[type].icon}</span>
              <span className="font-medium">{WORKOUT_TYPES[type]}</span>
            </div>
          ))}
        </div>

        {selectedDate && (
          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Selected: <span className="font-semibold text-foreground">{selectedDate}</span>
            </p>
            <Select
              value={scheduleData.monthlySchedule[selectedDate] || "rest"}
              onValueChange={(value) => handleWorkoutChange(value as WorkoutType)}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(WORKOUT_TYPES) as WorkoutType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    {workoutColors[type].icon} {WORKOUT_TYPES[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-secondary/30">
          <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
            <ChevronLeft size={20} />
          </Button>
          <h2 className="font-display text-xl font-bold text-foreground">
            {monthNames[month]} {year}
          </h2>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-secondary/50">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className={`py-2 text-center font-semibold text-xs ${
                index === 0 || index === 6 ? "text-primary" : "text-foreground"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((cell, index) => {
            const isWeekend = index % 7 === 0 || index % 7 === 6;
            const isSelected = cell.dateKey === selectedDate;
            const colors = cell.workout ? workoutColors[cell.workout] : null;

            return (
              <div
                key={index}
                onClick={() => handleDayClick(cell.dateKey)}
                className={`min-h-[70px] p-1 border-t border-r border-border cursor-pointer transition-all ${
                  isWeekend ? "bg-pink-50/30" : "bg-card"
                } ${isSelected ? "ring-2 ring-primary ring-inset" : ""} ${
                  cell.day ? "hover:bg-secondary/50" : ""
                } ${index % 7 === 6 ? "border-r-0" : ""}`}
              >
                {cell.day && (
                  <div className="h-full flex flex-col">
                    <span className={`text-xs font-medium ${isWeekend ? "text-primary" : "text-foreground"}`}>
                      {cell.day}
                    </span>
                    {cell.workout && colors && (
                      <div className={`flex-1 flex items-center justify-center rounded ${colors.bg} mt-1`}>
                        <span className="text-lg">{colors.icon}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Click on a day to select it, then choose a workout type to assign.
      </p>
    </div>
  );
};

export default AdminSchedule;
