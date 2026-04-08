import { Inter, Cinzel, Cinzel_Decorative, UnifrakturCook } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-accent",
  display: "swap",
});

export const unifrakturCook = UnifrakturCook({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-display",
  display: "swap",
});
