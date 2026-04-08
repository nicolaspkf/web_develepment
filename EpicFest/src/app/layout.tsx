import type { Metadata } from "next";
import { inter, cinzel, cinzelDecorative, unifrakturCook } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EpicFest — Denmark's Power & Fantasy Metal Festival",
    template: "%s | EpicFest",
  },
  description:
    "EpicFest is Denmark's premier power & fantasy metal festival in Roskilde. Two days of epic metal, D&D quests, Warhammer workshops, and unforgettable adventures.",
  keywords: [
    "EpicFest",
    "power metal festival",
    "fantasy metal",
    "Roskilde",
    "Denmark",
    "metal festival",
    "D&D",
    "tabletop gaming",
  ],
  openGraph: {
    type: "website",
    locale: "da_DK",
    alternateLocale: "en_US",
    siteName: "EpicFest",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${cinzel.variable} ${cinzelDecorative.variable} ${unifrakturCook.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-dark-800 text-parchment">
        {children}
      </body>
    </html>
  );
}
