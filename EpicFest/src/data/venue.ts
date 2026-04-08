import type { Venue, Accommodation } from "@/types";

export const venues: Venue[] = [
  {
    id: "gimle",
    name: "Gimle",
    fantasyName: "Gimle — The Ancient Hall",
    description: {
      da: "Roskildes legendariske koncertsted og hovedkvarter for EpicFest. Her finder du hovedscenen og det meste af festivalens musik.",
      en: "Roskilde's legendary concert venue and headquarters for EpicFest. Here you'll find the main stage and most of the festival's music.",
    },
    address: "Helligkorsvej 2, 4000 Roskilde",
  },
  {
    id: "kongrescenter",
    name: "Roskilde Kongrescenter",
    fantasyName: "King Roar's Hall",
    description: {
      da: "Et moderne konferencecenter omdannet til en episk festivalscene. Her finder du den anden hovedscene og flere aktiviteter.",
      en: "A modern conference center transformed into an epic festival stage. Home to the second main stage and many activities.",
    },
    address: "Møllehusvej 15, 4000 Roskilde",
  },
  {
    id: "raven-tavern",
    name: "The Raven Tavern",
    fantasyName: "The Raven Tavern",
    description: {
      da: "Gimles bar omdannet til en fantasy-taverna med custom-bryggede øl, D&D-sessioner og Power Club metal disco.",
      en: "Gimle's bar transformed into a fantasy tavern with custom-brewed beers, D&D sessions, and Power Club metal disco.",
    },
    address: "Helligkorsvej 2, 4000 Roskilde (inside Gimle)",
  },
];

export const accommodations: Accommodation[] = [
  {
    id: "danhostel",
    name: "DANHOSTEL Roskilde",
    distance: "16 min walk",
    priceRange: "250-800 DKK/night",
    bookingUrl: "https://www.danhostel.dk/en/hostel/danhostel-roskilde",
  },
  {
    id: "sheraton",
    name: "Four Points Flex by Sheraton",
    distance: "10 min walk",
    priceRange: "800-1200 DKK/night",
    bookingUrl: "https://www.marriott.com/en-us/hotels/cphrf-four-points-flex-roskilde/overview/",
  },
  {
    id: "scandic",
    name: "Scandic Roskilde Park",
    distance: "17 min walk",
    priceRange: "900-1400 DKK/night",
    bookingUrl: "https://www.scandichotels.com",
  },
  {
    id: "comwell",
    name: "Comwell Roskilde",
    distance: "7 min drive",
    priceRange: "1000-1600 DKK/night",
    bookingUrl: "https://www.comwell.com",
  },
  {
    id: "camping",
    name: "Roskilde Camping",
    distance: "8 min drive",
    priceRange: "100-300 DKK/night",
    bookingUrl: "https://roskildecamping.dk/",
  },
];

export const transport = {
  train: {
    da: "Tag toget til Roskilde Station (20 min fra København H). Derfra er det 15 minutters gang til Gimle.",
    en: "Take the train to Roskilde Station (20 min from Copenhagen Central). From there it's a 15-minute walk to Gimle.",
  },
  car: {
    da: "700 gratis parkeringspladser ved Roskilde Kongrescenter. GPS: Møllehusvej 15, 4000 Roskilde.",
    en: "700 free parking spaces at Roskilde Kongrescenter. GPS: Møllehusvej 15, 4000 Roskilde.",
  },
  airport: {
    da: "Fra København Lufthavn: Tag toget til København H, skift til Roskilde-toget. Total rejsetid ca. 50 min.",
    en: "From Copenhagen Airport: Take the train to Copenhagen Central, transfer to the Roskilde train. Total travel time approx. 50 min.",
  },
};
