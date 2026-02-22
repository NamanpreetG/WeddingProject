import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karminder & Simranjit — 2nd April 2027",
  description:
    "Join us as we celebrate the wedding of Karminder and Simranjit on 2nd April 2027 in Jalandhar, Punjab.",
  openGraph: {
    title: "Karminder & Simranjit — Wedding Invitation",
    description: "We joyfully invite you to celebrate our wedding day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${playfair.variable} ${lato.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">{children}</body>
    </html>
  );
}
