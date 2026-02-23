import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "@/components/providers/lenis-provider";
import "./globals.css";

const lixxDisplay = localFont({
  src: "../public/fonts/satoshi-black.woff2",
  variable: "--font-lixx-display",
  display: "swap",
});

const lixxMono = localFont({
  src: "../public/fonts/lixx-terminal-mono.ttf",
  variable: "--font-lixx-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIXX",
  description: "Hyper-modern solid-state energy interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lixxDisplay.variable} ${lixxMono.variable} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
