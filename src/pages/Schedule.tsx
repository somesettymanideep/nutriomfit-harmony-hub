import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getScheduleData, ScheduleData, WorkoutType, WORKOUT_TYPES } from "@/lib/scheduleStore";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
} from "lucide-react";
import bannerImage from "@/assets/banner-schedule.jpg";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const workoutColors: Record<WorkoutType, { bg: string; text: string; icon: string }> = {
  yoga: { bg: "bg-cyan-100", text: "text-cyan-700", icon: "🧘" },
  upper_body: { bg: "bg-purple-100", text: "text-purple-700", icon: "💪" },
  abs: { bg: "bg-pink-100", text: "text-pink-700", icon: "🔥" },
  lower_body: { bg: "bg-blue-100", text: "text-blue-700", icon: "🦵" },
  full_body: { bg: "bg-green-100", text: "text-green-700", icon: "⭐" },
  rest: { bg: "bg-gray-100", text: "text-gray-500", icon: "😴" },
};

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState<ScheduleData>(getScheduleData());

  useEffect(() => {
    const handleFocus = () => {
      setScheduleData(getScheduleData());
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const { year, month, daysInMonth, firstDayOfWeek, calendarDays } = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const days = lastDay.getDate();
    const startDay = firstDay.getDay();

    // Generate calendar grid
    const calendar: { day: number | null; workout: WorkoutType | null }[] = [];
    
    // Empty cells before first day
    for (let i = 0; i < startDay; i++) {
      calendar.push({ day: null, workout: null });
    }
    
    // Days of the month
    for (let d = 1; d <= days; d++) {
      const dateKey = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const workout = scheduleData.monthlySchedule[dateKey] || null;
      calendar.push({ day: d, workout });
    }

    return {
      year: y,
      month: m,
      daysInMonth: days,
      firstDayOfWeek: startDay,
      calendarDays: calendar,
    };
  }, [currentDate, scheduleData]);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Count workout types for the month
  const workoutCounts = useMemo(() => {
    const counts: Record<WorkoutType, number> = {
      yoga: 0,
      upper_body: 0,
      abs: 0,
      lower_body: 0,
      full_body: 0,
      rest: 0,
    };
    calendarDays.forEach(({ workout }) => {
      if (workout && workout !== "rest") {
        counts[workout]++;
      }
    });
    return counts;
  }, [calendarDays]);

  const totalClasses = Object.values(workoutCounts).reduce((a, b) => a + b, 0) - workoutCounts.rest;

  return (
    <Layout>
      <PageBanner
        badge="Monthly Schedule"
        title="Class"
        highlight="Calendar"
        description="View our monthly workout schedule. Join us for yoga, strength training, and more. Classes run Mon-Fri at 6 AM & 6:15 PM, Sat & Sun at 7:30 AM."
        icon={<Calendar size={16} />}
        backgroundImage={bannerImage}
      />

      {/* Schedule Timings */}
      <section className="py-12 bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-primary" />
              <div>
                <p className="text-primary font-semibold">{scheduleData.weekdayTimings}</p>
                <p className="text-primary-foreground/70 text-sm">Weekday Sessions</p>
              </div>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-primary" />
              <div>
                <p className="text-primary font-semibold">{scheduleData.weekendTimings}</p>
                <p className="text-primary-foreground/70 text-sm">Weekend Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="outline" size="icon" onClick={goToPrevMonth}>
                <ChevronLeft size={20} />
              </Button>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {monthNames[month]} {year}
              </h2>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {(Object.keys(workoutCounts) as WorkoutType[])
                .filter((type) => type !== "rest" && workoutCounts[type] > 0)
                .map((type) => (
                  <div
                    key={type}
                    className={`px-4 py-2 rounded-full ${workoutColors[type].bg} ${workoutColors[type].text} font-medium flex items-center gap-2`}
                  >
                    <span>{workoutColors[type].icon}</span>
                    <span>{workoutCounts[type]} {WORKOUT_TYPES[type]} Classes</span>
                  </div>
                ))}
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-bold">
                {totalClasses} Total Classes
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 p-4 bg-secondary/50 rounded-xl">
              {(Object.keys(WORKOUT_TYPES) as WorkoutType[])
                .filter((type) => type !== "rest")
                .map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded ${workoutColors[type].bg} flex items-center justify-center text-sm`}>
                      {workoutColors[type].icon}
                    </div>
                    <span className="text-sm text-muted-foreground">{WORKOUT_TYPES[type]}</span>
                  </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              {/* Day Headers */}
              <div className="grid grid-cols-7 bg-secondary/50">
                {dayNames.map((day, index) => (
                  <div
                    key={day}
                    className={`py-3 text-center font-display font-semibold text-sm ${
                      index === 0 || index === 6 ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Cells */}
              <div className="grid grid-cols-7">
                {calendarDays.map((cell, index) => {
                  const isWeekend = index % 7 === 0 || index % 7 === 6;
                  const workout = cell.workout;
                  const colors = workout ? workoutColors[workout] : null;

                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] md:min-h-[100px] p-2 border-t border-r border-border ${
                        isWeekend ? "bg-pink-50/50" : "bg-card"
                      } ${index % 7 === 6 ? "border-r-0" : ""}`}
                    >
                      {cell.day && (
                        <div className="h-full flex flex-col">
                          <span className={`text-sm font-medium mb-1 ${isWeekend ? "text-primary" : "text-foreground"}`}>
                            {cell.day}
                          </span>
                          {workout && workout !== "rest" && colors && (
                            <div className={`flex-1 flex items-center justify-center rounded-lg ${colors.bg}`}>
                              <span className="text-2xl md:text-3xl">{colors.icon}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Join Our Classes?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Book a consultation to get started on your wellness journey today.
          </p>
          <Button variant="secondary" size="xl" asChild>
            <Link to="/contact" className="group">
              Book Consultation
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
