"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer ring/bracket
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000001] overflow-hidden select-none">
      {/* 1. Main Pointer (The Dot) */}
      <motion.div
        className="absolute h-1.5 w-1.5 bg-kinetic-accent rounded-full shadow-[0_0_8px_var(--color-kinetic-accent)]"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 2. Status Ring / Brackets */}
      <motion.div
        className="absolute border border-kinetic-accent/40"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
        }}
        animate={{
          rotate: isHovered ? 90 : 0,
          borderColor: isHovered ? "rgba(223, 225, 4, 0.8)" : "rgba(223, 225, 4, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Corner Accents for the 'OS' look */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-kinetic-accent" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-kinetic-accent" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-kinetic-accent" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-kinetic-accent" />
      </motion.div>

      {/* 3. Telemetry Readout (X, Y Coords) */}
      <div 
        className="absolute font-mono text-[7px] text-kinetic-accent/60 flex flex-col gap-0.5"
        style={{
          left: coords.x + 20,
          top: coords.y + 20,
        }}
      >
        <span className="leading-none">X: {Math.round(coords.x).toString().padStart(4, "0")}</span>
        <span className="leading-none">Y: {Math.round(coords.y).toString().padStart(4, "0")}</span>
        {isHovered && (
          <motion.span 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[6px] font-black uppercase text-kinetic-accent"
          >
            [INTERACTIVE]
          </motion.span>
        )}
      </div>
    </div>
  );
};
