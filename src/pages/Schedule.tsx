import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getScheduleData, ScheduleData, WorkoutType, WORKOUT_TYPES, resetScheduleToDefault } from "@/lib/scheduleStore";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
} from "lucide-react";
import bannerImage from "@/assets/banner-schedule.jpg";
import {
  YogaIcon,
  UpperBodyIcon,
  AbsIcon,
  LowerBodyIcon,
  FullBodyIcon,
} from "@/components/schedule/WorkoutIcons";
import logo from "@/assets/nutriomfit-logo.jpg";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const workoutConfig: Record<WorkoutType, { 
  bg: string; 
  cellBg: string;
  text: string; 
  Icon: React.ComponentType<{ className?: string }> | null;
}> = {
  yoga: { 
    bg: "bg-cyan-500", 
    cellBg: "bg-green-100",
    text: "text-purple-600", 
    Icon: YogaIcon 
  },
  upper_body: { 
    bg: "bg-purple-500", 
    cellBg: "bg-green-100",
    text: "text-purple-600", 
    Icon: UpperBodyIcon 
  },
  abs: { 
    bg: "bg-pink-500", 
    cellBg: "bg-green-100",
    text: "text-purple-600", 
    Icon: AbsIcon 
  },
  lower_body: { 
    bg: "bg-blue-500", 
    cellBg: "bg-green-100",
    text: "text-purple-600", 
    Icon: LowerBodyIcon 
  },
  full_body: { 
    bg: "bg-green-500", 
    cellBg: "bg-green-100",
    text: "text-purple-600", 
    Icon: FullBodyIcon 
  },
  rest: { 
    bg: "bg-pink-200", 
    cellBg: "bg-pink-100",
    text: "text-gray-400", 
    Icon: null 
  },
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

  const { year, month, calendarDays } = useMemo(() => {
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
      if (workout) {
        counts[workout]++;
      }
    });
    return counts;
  }, [calendarDays]);

  // Calculate total classes (excluding rest)
  const yogaClasses = workoutCounts.yoga;
  const absClasses = workoutCounts.abs;
  const otherClasses = workoutCounts.upper_body + workoutCounts.lower_body + workoutCounts.full_body;

  return (
    <Layout>
      <PageBanner
        badge="Monthly Schedule"
        title="Class"
        highlight="Calendar"
        description="View our monthly workout schedule. Join us for yoga, strength training, and more."
        icon={<Calendar size={16} />}
        backgroundImage={bannerImage}
      />

      {/* Calendar Section - Matching the image design */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-cyan-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header with Logo, Month Title, and Class Counts */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white rounded-t-2xl p-4 shadow-sm">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img src={logo} alt="NutriomFit" className="h-12 md:h-16 object-contain" />
              </div>

              {/* Month/Year with Navigation */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={goToPrevMonth}
                  className="hover:bg-primary/10"
                >
                  <ChevronLeft size={24} />
                </Button>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-primary uppercase tracking-wider">
                  {monthNames[month]} {year}
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={goToNextMonth}
                  className="hover:bg-primary/10"
                >
                  <ChevronRight size={24} />
                </Button>
              </div>

              {/* Class Count Badges */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-lg">
                  <span className="text-xl md:text-2xl font-bold text-white">{yogaClasses}</span>
                  <span className="text-[10px] md:text-xs text-white/90 uppercase font-semibold">Classes</span>
                </div>
                <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-gray-300 to-gray-500 shadow-lg">
                  <span className="text-xl md:text-2xl font-bold text-white">{absClasses}</span>
                  <span className="text-[10px] md:text-xs text-white/90 uppercase font-semibold">Classes</span>
                </div>
                <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 shadow-lg">
                  <span className="text-xl md:text-2xl font-bold text-white">{otherClasses}</span>
                  <span className="text-[10px] md:text-xs text-white/90 uppercase font-semibold">Classes</span>
                </div>
              </div>
            </div>

            {/* Main Calendar Area */}
            <div className="flex flex-col lg:flex-row bg-white rounded-b-2xl shadow-lg overflow-hidden">
              {/* Legend Sidebar */}
              <div className="lg:w-48 bg-purple-50 p-4 lg:p-6 flex lg:flex-col flex-wrap gap-4 justify-center lg:justify-start">
                {(Object.keys(WORKOUT_TYPES) as WorkoutType[])
                  .filter((type) => type !== "rest")
                  .map((type) => {
                    const config = workoutConfig[type];
                    const IconComponent = config.Icon;
                    return (
                      <div key={type} className="flex items-center gap-3">
                        {IconComponent && (
                          <div className="w-10 h-10 flex items-center justify-center text-purple-600">
                            <IconComponent className="w-8 h-8" />
                          </div>
                        )}
                        <span className="text-sm font-semibold text-gray-700 uppercase">
                          {WORKOUT_TYPES[type]}
                        </span>
                      </div>
                    );
                  })}
              </div>

              {/* Calendar Grid */}
              <div className="flex-1">
                {/* Day Headers */}
                <div className="grid grid-cols-7 bg-purple-200">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="py-3 text-center font-display font-bold text-sm md:text-base text-purple-800 uppercase"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Cells */}
                <div className="grid grid-cols-7">
                  {calendarDays.map((cell, index) => {
                    const workout = cell.workout;
                    const config = workout ? workoutConfig[workout] : null;
                    const isRest = workout === "rest";
                    const IconComponent = config?.Icon;

                    return (
                      <div
                        key={index}
                        className={`min-h-[70px] md:min-h-[90px] p-1 md:p-2 border-t border-r border-gray-200 last:border-r-0 ${
                          isRest ? "bg-pink-100" : workout ? "bg-green-100" : "bg-white"
                        }`}
                      >
                        {cell.day && (
                          <div className="h-full flex flex-col">
                            <span className="text-xs md:text-sm font-semibold text-gray-700 mb-1">
                              {cell.day}
                            </span>
                            {workout && workout !== "rest" && IconComponent && (
                              <div className="flex-1 flex items-center justify-center">
                                <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />
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

            {/* Timings Footer */}
            <div className="mt-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 md:p-6 flex flex-wrap items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <Clock size={28} className="text-yellow-300" />
                <span className="text-white font-bold text-sm md:text-lg uppercase">
                  {scheduleData.weekdayTimings}
                </span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/30" />
              <span className="text-yellow-200 font-bold text-sm md:text-lg uppercase">
                {scheduleData.weekendTimings}
              </span>
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
