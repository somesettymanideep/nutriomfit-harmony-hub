// Schedule Two store for managing the image-based monthly calendar

export interface ScheduleTwoData {
  weekdayTimings: string;
  weekendTimings: string;
  calendarImage: string | null; // URL or base64 of uploaded image
  month: string; // e.g., "JAN 2026"
  classCounts: {
    count1: number;
    count2: number;
    count3: number;
  };
}

const DEFAULT_SCHEDULE_TWO: ScheduleTwoData = {
  weekdayTimings: "MON-FRI 6 AM & 6.15 PM",
  weekendTimings: "SAT & SUN ONLY 7.30 AM",
  calendarImage: null,
  month: "JAN 2026",
  classCounts: {
    count1: 14,
    count2: 16,
    count3: 18,
  },
};

export const getScheduleTwoData = (): ScheduleTwoData => {
  const stored = localStorage.getItem("scheduleTwoData");
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem("scheduleTwoData", JSON.stringify(DEFAULT_SCHEDULE_TWO));
  return DEFAULT_SCHEDULE_TWO;
};

export const saveScheduleTwoData = (data: ScheduleTwoData): void => {
  localStorage.setItem("scheduleTwoData", JSON.stringify(data));
};

export const updateCalendarImage = (imageData: string): void => {
  const data = getScheduleTwoData();
  data.calendarImage = imageData;
  saveScheduleTwoData(data);
};

export const resetScheduleTwoToDefault = (): void => {
  localStorage.setItem("scheduleTwoData", JSON.stringify(DEFAULT_SCHEDULE_TWO));
};
