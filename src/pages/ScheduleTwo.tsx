import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { getScheduleTwoData, ScheduleTwoData } from "@/lib/scheduleTwoStore";
import logo from "@/assets/nutriomfit-logo.jpg";
import iconYoga from "@/assets/icon-yoga.png";
import iconUpperBody from "@/assets/icon-upper-body.png";
import iconAbs from "@/assets/icon-abs.png";
import iconLowerBody from "@/assets/icon-lower-body.png";
import iconFullBody from "@/assets/icon-full-body.png";
import bannerSchedule from "@/assets/banner-schedule.jpg";
import { Clock, CalendarDays } from "lucide-react";

const ScheduleTwo = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleTwoData>(getScheduleTwoData());

  useEffect(() => {
    const handleFocus = () => {
      setScheduleData(getScheduleTwoData());
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const workoutLegend = [
    { name: "YOGA", icon: iconYoga },
    { name: "UPPER BODY", icon: iconUpperBody },
    { name: "ABS", icon: iconAbs },
    { name: "LOWER BODY", icon: iconLowerBody },
    { name: "FULL BODY", icon: iconFullBody },
  ];

  return (
    <Layout>
      <PageBanner
        badge="Monthly View"
        title="Workout"
        highlight="Calendar"
        description="Plan your fitness journey with our monthly workout calendar. Stay consistent, track your progress, and achieve your goals."
        icon={<CalendarDays size={16} />}
        backgroundImage={bannerSchedule}
      />
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <img src={logo} alt="NutriomFit" className="h-16 w-auto object-contain" />
              </div>

              {/* Month Title */}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-800 tracking-wide">
                {scheduleData.month}
              </h1>

              {/* Class Count Badges */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <span className="text-xl font-bold text-white">{scheduleData.classCounts.count1}</span>
                    <p className="text-[8px] text-white/90 uppercase">Classes</p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <span className="text-xl font-bold text-gray-700">{scheduleData.classCounts.count2}</span>
                    <p className="text-[8px] text-gray-600 uppercase">Classes</p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <span className="text-xl font-bold text-white">{scheduleData.classCounts.count3}</span>
                    <p className="text-[8px] text-white/90 uppercase">Classes</p>
                  </div>
                </div>
                {/* UK Flag placeholder */}
                <div className="w-10 h-8 bg-gradient-to-b from-blue-900 via-white to-red-600 rounded shadow"></div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Legend */}
              <div className="lg:w-48 flex lg:flex-col gap-4 flex-wrap justify-center lg:justify-start py-4">
                {workoutLegend.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <img 
                      src={item.icon} 
                      alt={item.name}
                      className="w-12 h-12 object-contain"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                    <span className="font-semibold text-gray-700 text-sm whitespace-nowrap">{item.name}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Image */}
              <div className="flex-1 border-4 border-purple-600 rounded-lg overflow-hidden bg-white min-h-[400px]">
                {scheduleData.calendarImage ? (
                  <img 
                    src={scheduleData.calendarImage} 
                    alt="Monthly Calendar" 
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="h-full min-h-[400px] flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-400">
                      <Clock size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Calendar image not set</p>
                      <p className="text-sm">Admin can upload the monthly calendar image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timing Footer */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex flex-wrap justify-center items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Clock size={20} className="text-yellow-800" />
                  </div>
                  <span className="font-bold text-pink-600 text-lg">{scheduleData.weekdayTimings}</span>
                </div>
                <span className="font-bold text-purple-600 text-lg">{scheduleData.weekendTimings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleTwo;
