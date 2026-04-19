import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Harshika | Full-Stack Developer & Creative Technologist",
  description:
    "Portfolio of Harshika — building high-performance applications with clean architectures and memorable user experiences.",
};

import ClientLayout from "@/components/ClientLayout";
import { CRTFilter } from "@/components/animations/CRTFilter";
import { CustomCursor } from "@/components/animations/CustomCursor";
import Navbar from "@/components/Navbar";
import Availability from "@/sections/Availability";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-kinetic-bg antialiased`} suppressHydrationWarning>
        <CustomCursor />
        <CRTFilter />
        <Navbar />
        <Availability />
        <div className="h-14" /> {/* Spacer matched to marquee height to prevent overlap */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
