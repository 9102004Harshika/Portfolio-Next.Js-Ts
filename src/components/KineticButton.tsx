"use client";

import React from "react";
import { motion } from "framer-motion";
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
  const baseStyles = "inline-flex items-center justify-center font-display font-bold uppercase tracking-tighter transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-kinetic-accent";
  
  const variants = {
    primary: "bg-kinetic-accent text-black hover:scale-105 active:scale-95",
    outline: "border-2 border-kinetic-border bg-transparent text-kinetic-fg hover:bg-kinetic-accent hover:text-black active:scale-95",
    ghost: "bg-transparent text-kinetic-fg hover:text-kinetic-accent active:scale-95",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm md:text-base",
    md: "h-14 px-8 text-base md:text-lg",
    lg: "h-20 px-12 text-xl md:text-2xl",
  };

  const MotionButton = motion.button as any;

  return (
    <MotionButton
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: variant === "ghost" ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ borderRadius: "0px" }}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
