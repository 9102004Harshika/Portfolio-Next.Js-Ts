"use client";

import React, { useState, useEffect } from "react";
import OSLoader from "./OSLoader";
import { SystemLog } from "./SystemLog";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

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
    </>
  );
}
