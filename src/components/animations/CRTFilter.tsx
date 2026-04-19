"use client";

import React from "react";
import { motion } from "framer-motion";

export const CRTFilter: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Scanlines Effect */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 4px, 3px 100%",
        }}
      />

      {/* Moving Scanline */}
      <motion.div
        className="absolute inset-0 w-full h-[2px] bg-kinetic-accent/10 z-10"
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Screen Flicker */}
      <motion.div
        className="absolute inset-0 bg-white/5 mix-blend-overlay"
        animate={{
          opacity: [0, 0.02, 0, 0.015, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      
      {/* Static Noise */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
    </div>
  );
};
