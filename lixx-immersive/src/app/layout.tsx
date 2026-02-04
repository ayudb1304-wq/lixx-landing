import type { Metadata } from "next";
import { Bungee, Outfit, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import IsomaltSpine from "@/components/layout/IsomaltSpine";

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lixx | Functional Confectionery",
  description: "Experience the future of functional confectionery. Lixx delivers premium, purpose-driven treats for the modern lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bungee.variable} ${outfit.variable} ${syne.variable}`}>
      <body className="bg-lixx-black antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <IsomaltSpine />
      </body>
    </html>
  );
}
