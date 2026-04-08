import type { Quest } from "@/types";

export const quests: Quest[] = [
  {
    id: "q1",
    title: { da: "Graven til den Glemte Konge", en: "The Tomb of the Forgotten King" },
    description: {
      da: "Led dit hold gennem en farefuld dungeon fyldt med fælder og udøde vogtere. Kun de modigste vil nå skatten i kongens gravkammer.",
      en: "Lead your party through a perilous dungeon filled with traps and undead guardians. Only the bravest will reach the treasure in the king's burial chamber.",
    },
    category: "dnd",
    difficulty: 3,
    day: "Friday",
    timeSlot: "14:00 - 17:00",
    location: "The Raven Tavern — Room A",
    maxSpots: 6,
    currentSpots: 2,
    dmOrInstructor: "DM Erik 'Dragonslayer' Hansen",
  },
  {
    id: "q2",
    title: { da: "Dragens Vrede", en: "The Dragon's Wrath" },
    description: {
      da: "En urgammel drage er vækket fra sin slummer. Jeres hold skal finde en måde at besejre den — eller forhandle med den.",
      en: "An ancient dragon has awakened from its slumber. Your party must find a way to defeat it — or negotiate with it.",
    },
    category: "dnd",
    difficulty: 5,
    day: "Saturday",
    timeSlot: "13:00 - 17:00",
    location: "The Raven Tavern — Room A",
    maxSpots: 6,
    currentSpots: 4,
    dmOrInstructor: "DM Erik 'Dragonslayer' Hansen",
  },
  {
    id: "q3",
    title: { da: "Begynder Quest: Taverna-mysteriet", en: "Beginner Quest: The Tavern Mystery" },
    description: {
      da: "Perfekt for nye spillere! En mystisk tyv har stjålet tavernaens magiske øl-opskrift. Find tyven og red festivalen!",
      en: "Perfect for new players! A mysterious thief has stolen the tavern's magical ale recipe. Find the thief and save the festival!",
    },
    category: "dnd",
    difficulty: 1,
    day: "Friday",
    timeSlot: "11:00 - 13:00",
    location: "The Raven Tavern — Room B",
    maxSpots: 8,
    currentSpots: 3,
    dmOrInstructor: "DM Sarah Møller",
  },
  {
    id: "q4",
    title: { da: "Mal din Første Miniature", en: "Paint Your First Miniature" },
    description: {
      da: "Lær grundlæggende maleteknikker fra en erfaren Warhammer-maler. Alle materialer medfølger — tag din færdige miniature med hjem!",
      en: "Learn basic painting techniques from an experienced Warhammer painter. All materials provided — take your finished miniature home!",
    },
    category: "warhammer",
    difficulty: 1,
    day: "Friday",
    timeSlot: "12:00 - 14:00",
    location: "The Warhammer Forge",
    maxSpots: 12,
    currentSpots: 5,
    dmOrInstructor: "Master Painter Jonas Lund",
  },
  {
    id: "q5",
    title: { da: "Avanceret: Grimdark Teknikker", en: "Advanced: Grimdark Techniques" },
    description: {
      da: "For erfarne malere: lær oil washing, weathering og grimdark-stil maleteknikker. Tag din egen miniature med.",
      en: "For experienced painters: learn oil washing, weathering and grimdark-style painting techniques. Bring your own miniature.",
    },
    category: "warhammer",
    difficulty: 4,
    day: "Saturday",
    timeSlot: "11:00 - 14:00",
    location: "The Warhammer Forge",
    maxSpots: 8,
    currentSpots: 6,
    dmOrInstructor: "Master Painter Jonas Lund",
  },
  {
    id: "q6",
    title: { da: "Retro Gaming Turnering", en: "Retro Gaming Tournament" },
    description: {
      da: "Deltag i en eliminerings-turnering på klassiske arkade- og konsolspil. Præmier til top 3!",
      en: "Join an elimination tournament on classic arcade and console games. Prizes for top 3!",
    },
    category: "gaming",
    difficulty: 2,
    day: "Friday",
    timeSlot: "15:00 - 18:00",
    location: "The Gaming Corner",
    maxSpots: 16,
    currentSpots: 9,
  },
  {
    id: "q7",
    title: { da: "Smag Dragens Tårer", en: "Taste the Dragon's Tears" },
    description: {
      da: "En guidet smagning af EpicFest's custom-bryggede øl: Ale of the Mountain King, Epic and Juicy Mana, og Tears of the Dragon.",
      en: "A guided tasting of EpicFest's custom-brewed beers: Ale of the Mountain King, Epic and Juicy Mana, and Tears of the Dragon.",
    },
    category: "tavern",
    difficulty: 1,
    day: "Friday",
    timeSlot: "16:00 - 17:00",
    location: "The Raven Tavern",
    maxSpots: 20,
    currentSpots: 8,
  },
  {
    id: "q8",
    title: { da: "Cosplay Meetup & Fotoshoot", en: "Cosplay Meetup & Photoshoot" },
    description: {
      da: "Mød andre cosplayere, vis dit kostume frem og få professionelle fotos taget i fantastiske kulisser.",
      en: "Meet fellow cosplayers, show off your costume and get professional photos taken in fantastic settings.",
    },
    category: "heroes",
    difficulty: 1,
    day: "Saturday",
    timeSlot: "14:00 - 16:00",
    location: "The Hall of Heroes",
    maxSpots: 30,
    currentSpots: 12,
  },
  {
    id: "q9",
    title: { da: "Roskilde Domkirke Natkirke", en: "Roskilde Cathedral Night Church" },
    description: {
      da: "En unik oplevelse: besøg den UNESCO-listede Roskilde Domkirke i aftentimerne med særlig belysning og akustisk musik.",
      en: "A unique experience: visit the UNESCO-listed Roskilde Cathedral in the evening hours with special lighting and acoustic music.",
    },
    category: "special",
    difficulty: 1,
    day: "Friday",
    timeSlot: "20:00 - 21:30",
    location: "Roskilde Cathedral",
    maxSpots: 50,
    currentSpots: 22,
  },
];

export function getQuestsByCategory(category: string): Quest[] {
  return quests.filter((q) => q.category === category);
}

export function getQuestsByDay(day: "Friday" | "Saturday"): Quest[] {
  return quests.filter((q) => q.day === day);
}

export const questCategoryLabels: Record<string, { da: string; en: string; iconType: string }> = {
  dnd: { da: "D&D Quests", en: "D&D Quests", iconType: "dragon" },
  warhammer: { da: "Warhammer Forge", en: "The Warhammer Forge", iconType: "fire" },
  gaming: { da: "Gaming Corner", en: "The Gaming Corner", iconType: "helm" },
  tavern: { da: "The Raven Tavern", en: "The Raven Tavern", iconType: "goblet" },
  heroes: { da: "Hall of Heroes", en: "The Hall of Heroes", iconType: "shield" },
  special: { da: "Specielle Events", en: "Special Events", iconType: "crystal" },
};
