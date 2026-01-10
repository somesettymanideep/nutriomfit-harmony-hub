// Schedule store for managing monthly workout calendar

export type WorkoutType = "yoga" | "upper_body" | "abs" | "lower_body" | "full_body" | "rest";

export const WORKOUT_TYPES: Record<WorkoutType, string> = {
  yoga: "Yoga",
  upper_body: "Upper Body",
  abs: "Abs",
  lower_body: "Lower Body",
  full_body: "Full Body",
  rest: "Rest",
};

export interface ScheduleData {
  weekdayTimings: string;
  weekendTimings: string;
  monthlySchedule: Record<string, WorkoutType>; // key format: "YYYY-MM-DD"
}

const DEFAULT_SCHEDULE: ScheduleData = {
  weekdayTimings: "MON-FRI 6 AM & 6:15 PM",
  weekendTimings: "SAT & SUN ONLY 7:30 AM",
  monthlySchedule: generateDefaultSchedule(),
};

// Generate a default schedule for current and next 2 months
// Pattern based on January 2026 calendar:
// Sun/Mon = Rest, Tue = Abs, Wed = Lower Body, Thu = Yoga, Fri = Yoga, Sat = Full Body
function generateDefaultSchedule(): Record<string, WorkoutType> {
  const schedule: Record<string, WorkoutType> = {};
  const today = new Date();
  
  // Generate for current month and next 2 months
  for (let monthOffset = 0; monthOffset <= 2; monthOffset++) {
    const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      // Pattern: Sun=Rest, Mon=Rest, Tue=Abs, Wed=Lower Body, Thu=Yoga, Fri=Yoga, Sat=Full Body
      switch (dayOfWeek) {
        case 0: // Sunday
        case 1: // Monday
          schedule[dateKey] = "rest";
          break;
        case 2: // Tuesday
          schedule[dateKey] = "abs";
          break;
        case 3: // Wednesday
          schedule[dateKey] = "lower_body";
          break;
        case 4: // Thursday
          schedule[dateKey] = "yoga";
          break;
        case 5: // Friday
          schedule[dateKey] = "yoga";
          break;
        case 6: // Saturday
          schedule[dateKey] = "full_body";
          break;
      }
    }
  }

  return schedule;
}

export const getScheduleData = (): ScheduleData => {
  const stored = localStorage.getItem("scheduleData");
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default schedule
  localStorage.setItem("scheduleData", JSON.stringify(DEFAULT_SCHEDULE));
  return DEFAULT_SCHEDULE;
};

export const saveScheduleData = (data: ScheduleData): void => {
  localStorage.setItem("scheduleData", JSON.stringify(data));
};

export const updateDayWorkout = (dateKey: string, workout: WorkoutType): void => {
  const data = getScheduleData();
  data.monthlySchedule[dateKey] = workout;
  saveScheduleData(data);
};

export const updateTimings = (weekdayTimings: string, weekendTimings: string): void => {
  const data = getScheduleData();
  data.weekdayTimings = weekdayTimings;
  data.weekendTimings = weekendTimings;
  saveScheduleData(data);
};

export const resetScheduleToDefault = (): void => {
  const defaultData: ScheduleData = {
    weekdayTimings: "MON-FRI 6 AM & 6:15 PM",
    weekendTimings: "SAT & SUN ONLY 7:30 AM",
    monthlySchedule: generateDefaultSchedule(),
  };
  localStorage.setItem("scheduleData", JSON.stringify(defaultData));
};
