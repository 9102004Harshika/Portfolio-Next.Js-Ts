"use client";

import React, { useState, useEffect } from "react";
import OSLoader from "./OSLoader";
import { SystemLog } from "./SystemLog";
import { motion, AnimatePresence } from "framer-motion";
import FloatingAssistant from "./FloatingAssistant";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Access hidden real loggers
    const realLog = (window as any).__HARSHIKA_OS_LOG__ || (() => {});
    const realTable = (window as any).__HARSHIKA_OS_TABLE__ || (() => {});

    // Final sweep to ensure a pristine slate
    const originalClear = console.clear.bind(console);
    originalClear();

    // Re-override clear to prevent any system/extension from wiping our message
    console.clear = () => {};

    // Hidden Console Identity Message
    realLog(
      "%c HARSHIKA.OS %c v1.0.0 %c",
      "background: #dfe104; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;",
      "background: #222; color: #dfe104; padding: 4px 8px; border-radius: 0 4px 4px 0;",
      "background: transparent;"
    );
    
    realLog(
      "%c[ACCESS_GRANTED]%c Terminal Uplink Established.\n%cWelcome back, Developer.%c",
      "color: #dfe104; font-weight: bold;",
      "color: #888;",
      "color: #fff; font-style: italic;",
      ""
    );

    realTable({
      identity: "Harshika",
      role: "Full-Stack Developer",
      core: "Next.js | TypeScript | Node.js",
      status: "Available for collaboration",
      location: "India"
    });

    realLog(
      "%cCuriosity found the secret! %cCheck localStorage for system artifacts.",
      "color: #dfe104; font-weight: bold;",
      "color: #888;"
    );

    // Artifacts in LocalStorage
    const identityDetails = {
      name: "Harshika",
      domain: "Full-Stack Development",
      specialization: "Creative Technologist",
      lastAccess: new Date().toISOString(),
      motto: "Building high-performance applications with clean architectures."
    };
    
    localStorage.setItem("harshika_identity", JSON.stringify(identityDetails));
    localStorage.setItem("system_status", "ONLINE_STABLE");
    localStorage.setItem("easter_egg_found", "true");
    
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <OSLoader 
            key="loader"
            onLoadingComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", scale: 0.95 }}
        animate={!isLoading ? { 
          opacity: 1, 
          clipPath: "inset(0 0% 0 0)", 
          scale: 1,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        } : { 
          opacity: 0, 
          clipPath: "inset(0 100% 0 0)", 
          scale: 0.95 
        }}
        className={isLoading ? "fixed inset-0 pointer-events-none overflow-hidden" : "relative min-h-screen"}
        suppressHydrationWarning={true}
      >
        {children}
        <SystemLog />
      </motion.div>
      <FloatingAssistant />
    </>
  );
}
