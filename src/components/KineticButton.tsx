"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KineticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function KineticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: KineticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-tighter transition-all duration-300 focus:outline-none overflow-hidden group";
  
  const variants = {
    primary: "bg-kinetic-accent text-black active:scale-95",
    outline: "border-2 border-kinetic-border bg-transparent text-kinetic-fg hover:border-kinetic-accent active:scale-95",
    ghost: "bg-transparent text-kinetic-fg hover:text-kinetic-accent active:scale-95",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm md:text-base",
    md: "h-14 px-8 text-base md:text-lg",
    lg: "h-20 px-12 text-xl md:text-2xl",
  };

  const MotionDiv = motion.div as any;
  const MotionButton = motion.button as any;

  // Glitch animation variants
  const glitchVariants = {
    initial: { x: 0, opacity: 0 },
    hover: { 
      x: [0, -2, 2, -1, 1, 0],
      opacity: [0, 1, 0, 1, 0],
      transition: { 
        duration: 0.2, 
        repeat: Infinity,
        repeatDelay: Math.random() * 0.5 
      } 
    }
  };

  return (
    <MotionButton
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      style={{ borderRadius: "0px" }}
      {...props}
    >
      {/* Glitch Layers (Only show on hover) */}
      <AnimatePresence>
        {isHovered && (
          <>
            <MotionDiv
              variants={glitchVariants}
              initial="initial"
              animate="hover"
              className="absolute inset-0 bg-red-500/30 mix-blend-screen z-0"
              style={{ clipPath: "inset(10% 0 30% 0)" }}
            />
            <MotionDiv
              variants={glitchVariants}
              initial="initial"
              animate="hover"
              className="absolute inset-0 bg-blue-500/30 mix-blend-screen z-0"
              style={{ clipPath: "inset(60% 0 5% 0)" }}
            />
          </>
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center">
        {children}
      </span>

      {/* Decorative corner accents for buttons */}
      {variant !== "ghost" && (
        <>
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-current opacity-50" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-current opacity-50" />
        </>
      )}
    </MotionButton>
  );
}
