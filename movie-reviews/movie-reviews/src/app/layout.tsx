import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReelReviews | Cinematic Movie Reviews",
  description: "Curated cinema insights and honest reviews for the discerning viewer. Discover your next favorite film with detailed reviews, ratings, and recommendations.",
  keywords: ["movie reviews", "film reviews", "cinema", "movies", "ratings"],
  openGraph: {
    title: "ReelReviews | Cinematic Movie Reviews",
    description: "Curated cinema insights and honest reviews for the discerning viewer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-zinc-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
