import {
  Fraunces,
  Source_Serif_4,
  Public_Sans,
  Noto_Sans_Bengali,
  Noto_Serif_Bengali,
} from "next/font/google";

// Display face — used for the masthead and large headlines only. Restrained use.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Long-form article body serif — optimized for sustained reading.
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// UI grotesque — navigation, metadata, buttons, dashboard.
export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Bangla UI / headlines — used whenever locale = bn.
export const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Bangla article body — paired with Source Serif for Latin glyphs.
export const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const fontVariables = [
  fraunces.variable,
  sourceSerif.variable,
  publicSans.variable,
  notoBengali.variable,
  notoSerifBengali.variable,
].join(" ");
