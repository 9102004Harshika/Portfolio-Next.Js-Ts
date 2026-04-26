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
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script id="disable-console-extensions" strategy="beforeInteractive">
          {`
            (function() {
              // Save original loggers for our "special" identity message
              window.__HARSHIKA_OS_LOG__ = console.log.bind(console);
              window.__HARSHIKA_OS_TABLE__ = console.table.bind(console);

              const noop = () => {};
              
              // Silence EVERYTHING
              console.log = noop;
              console.error = noop;
              console.warn = noop;
              console.info = noop;
              console.debug = noop;
              console.table = noop;
              console.dir = noop;
              console.group = noop;
              console.groupCollapsed = noop;
              console.groupEnd = noop;
              console.trace = noop;

              // Immediate clear to catch early extension noise
              console.clear();
            })();
          `}
        </Script>
      </head>
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
