import type { ScheduleSlot } from "@/types";

export const schedule: ScheduleSlot[] = [
  // === FRIDAY ===
  // The Realm of Might & Magic
  { id: "f-realm-1", bandId: "angus-mcsix", bandName: "Angus McSix", day: "Friday", stage: "The Realm of Might & Magic", startTime: "15:00", endTime: "16:00", genre: "Power Metal" },
  { id: "f-realm-2", bandId: "sirenia", bandName: "Sirenia", day: "Friday", stage: "The Realm of Might & Magic", startTime: "17:10", endTime: "18:10", genre: "Symphonic Gothic Metal" },
  { id: "f-realm-3", bandId: "rhapsody-of-fire", bandName: "Rhapsody of Fire", day: "Friday", stage: "The Realm of Might & Magic", startTime: "20:00", endTime: "21:15", genre: "Symphonic Power Metal" },
  { id: "f-realm-4", bandId: "ensiferum", bandName: "Ensiferum", day: "Friday", stage: "The Realm of Might & Magic", startTime: "23:00", endTime: "00:30", genre: "Folk Metal" },

  // King Roar's Hall
  { id: "f-king-1", bandId: "dragony", bandName: "Dragony", day: "Friday", stage: "King Roar's Hall", startTime: "16:05", endTime: "17:00", genre: "Symphonic Power Metal" },
  { id: "f-king-2", bandId: "mercenary", bandName: "Mercenary", day: "Friday", stage: "King Roar's Hall", startTime: "18:30", endTime: "19:45", genre: "Melodic Death/Power Metal" },
  { id: "f-king-3", bandId: "fairyland", bandName: "Fairyland", day: "Friday", stage: "King Roar's Hall", startTime: "21:30", endTime: "22:30", genre: "Symphonic Power Metal" },
  { id: "f-gimle-3", bandId: "mob-rules", bandName: "Mob Rules", day: "Friday", stage: "Gimle", startTime: "21:45", endTime: "22:45", genre: "Power Metal" },
  { id: "f-king-5", bandId: "masterplan", bandName: "Masterplan", day: "Friday", stage: "King Roar's Hall", startTime: "00:30", endTime: "01:30", genre: "Power Metal" },

  // Gimle
  { id: "f-gimle-1", bandId: "ipomonia", bandName: "Ipomonia", day: "Friday", stage: "Gimle", startTime: "16:15", endTime: "17:00", genre: "Progressive Metal" },
  { id: "f-gimle-2", bandId: "trick-or-treat", bandName: "Trick or Treat", day: "Friday", stage: "Gimle", startTime: "18:30", endTime: "19:30", genre: "Power Metal" },

  // Raven Tavern (Afterparty)
  { id: "f-raven-1", bandId: "afterparty-fri", bandName: "Afterparty", day: "Friday", stage: "The Raven Tavern", startTime: "00:30", endTime: "02:00", genre: "" },

  // === SATURDAY ===
  // The Realm of Might & Magic
  { id: "s-realm-1", bandId: "victorius", bandName: "Victorius", day: "Saturday", stage: "The Realm of Might & Magic", startTime: "15:00", endTime: "16:00", genre: "Power Metal" },
  { id: "s-realm-2", bandId: "twilight-force", bandName: "Twilight Force", day: "Saturday", stage: "The Realm of Might & Magic", startTime: "17:00", endTime: "18:00", genre: "Symphonic Power Metal" },
  { id: "s-realm-3", bandId: "sonata-arctica", bandName: "Sonata Arctica", day: "Saturday", stage: "The Realm of Might & Magic", startTime: "20:00", endTime: "21:30", genre: "Power Metal" },
  { id: "s-realm-4", bandId: "roy-khan", bandName: "Roy Khan", day: "Saturday", stage: "The Realm of Might & Magic", startTime: "23:00", endTime: "00:30", genre: "Power Metal" },

  // King Roar's Hall
  { id: "s-king-1", bandId: "seven-spires", bandName: "Seven Spires", day: "Saturday", stage: "King Roar's Hall", startTime: "18:30", endTime: "19:30", genre: "Symphonic Metal" },
  { id: "s-king-2", bandId: "dark-moor", bandName: "Dark Moor", day: "Saturday", stage: "King Roar's Hall", startTime: "21:30", endTime: "22:30", genre: "Symphonic Power Metal" },
  { id: "s-gimle-4", bandId: "innerwish", bandName: "InnerWish", day: "Saturday", stage: "Gimle", startTime: "21:45", endTime: "22:45", genre: "Power Metal" },
  { id: "s-king-4", bandId: "hagane", bandName: "Hagane", day: "Saturday", stage: "King Roar's Hall", startTime: "00:30", endTime: "01:30", genre: "Power Metal" },

  // Gimle
  { id: "s-gimle-1", bandId: "lost-dawning", bandName: "Lost Dawning", day: "Saturday", stage: "Gimle", startTime: "14:00", endTime: "15:00", genre: "Power Metal" },
  { id: "s-gimle-2", bandId: "fury", bandName: "Fury", day: "Saturday", stage: "Gimle", startTime: "15:45", endTime: "16:45", genre: "Heavy Metal" },
  { id: "s-gimle-3", bandId: "moonlight-haze", bandName: "Moonlight Haze", day: "Saturday", stage: "Gimle", startTime: "18:30", endTime: "19:30", genre: "Symphonic Power Metal" },

  // Raven Tavern (Afterparty)
  { id: "s-raven-1", bandId: "afterparty-sat", bandName: "Afterparty", day: "Saturday", stage: "The Raven Tavern", startTime: "00:30", endTime: "02:00", genre: "" },
];

export function getScheduleByDay(day: "Friday" | "Saturday"): ScheduleSlot[] {
  return schedule.filter((s) => s.day === day).sort((a, b) => {
    // Sort by time, treating 00:xx as after 23:xx
    const aTime = a.startTime < "06:00" ? "24" + a.startTime.slice(2) : a.startTime;
    const bTime = b.startTime < "06:00" ? "24" + b.startTime.slice(2) : b.startTime;
    return aTime.localeCompare(bTime);
  });
}

export function getScheduleByStage(stage: string): ScheduleSlot[] {
  return schedule.filter((s) => s.stage === stage);
}

export function getStagesForDay(day: "Friday" | "Saturday"): string[] {
  const stageOrder = ["The Realm of Might & Magic", "King Roar's Hall", "Gimle", "The Raven Tavern"];
  const stages = new Set(schedule.filter((s) => s.day === day).map((s) => s.stage));
  return stageOrder.filter((s) => stages.has(s));
}
