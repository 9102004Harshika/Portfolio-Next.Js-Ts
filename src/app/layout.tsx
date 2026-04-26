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
  metadataBase: new URL("https://harshikagawade.netlify.app"),
  title: {
    default: "Harshika Gawade | Full-Stack Developer",
    template: "%s | Harshika Gawade",
  },
  description:
    "Portfolio of Harshika Gawade — Specializing in high-performance web applications, clean architectures, and memorable user experiences. Full-Stack Developer and Creative Technologist.",
  keywords: [
    "Harshika Gawade",
    "Harshika",
    "Full-Stack Developer",
    "Frontend Developer",
    "Creative Technologist",
    "Web Developer Portfolio",
    "Harshika Portfolio",
  ],
  authors: [{ name: "Harshika Gawade" }],
  creator: "Harshika Gawade",
  publisher: "Harshika Gawade",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshikagawade.netlify.app",
    title: "Harshika Gawade | Full-Stack Developer",
    description: "Building high-performance applications with clean architectures and memorable user experiences.",
    siteName: "Harshika Gawade Portfolio",
    images: [
      {
        url: "/assets/harshika_themed.png",
        width: 1200,
        height: 630,
        alt: "Harshika Gawade - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshika Gawade | Full-Stack Developer",
    description: "Full-Stack Developer & Creative Technologist specializes in building high-performance applications.",
    images: ["/assets/harshika_themed.png"],
    creator: "@harshikagawade",
  },
};

import ClientLayout from "@/components/ClientLayout";
import { CRTFilter } from "@/components/animations/CRTFilter";
import { CustomCursor } from "@/components/animations/CustomCursor";
import Navbar from "@/components/Navbar";
import Availability from "@/sections/Availability";
import JsonLd from "@/components/JsonLd";
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
        <JsonLd />
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
