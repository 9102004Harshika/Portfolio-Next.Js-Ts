"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KineticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  number?: string;
}

export default function KineticCard({
  title,
  description,
  number,
  className,
  children,
  ...props
}: KineticCardProps) {
  const MotionDiv = motion.div as any;

  return (
    <MotionDiv
      className={cn(
        "group relative flex flex-col p-8 md:p-12 border-2 border-kinetic-border bg-kinetic-bg transition-colors duration-300 hover:bg-kinetic-accent hover:border-kinetic-accent hover:text-black",
        className
      )}
      style={{ borderRadius: "0px" }}
      {...props}
    >
      {number && (
        <span className="absolute top-4 right-8 font-display text-[6rem] md:text-[8rem] font-bold leading-none text-kinetic-muted transition-colors duration-300 group-hover:text-black/20 select-none pointer-events-none">
          {number}
        </span>
      )}
      
      <div className="relative z-10 flex flex-col gap-6">
        <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter text-kinetic-fg transition-colors duration-300 group-hover:text-black">
          {title}
        </h3>
        
        {description && (
          <p className="font-sans text-lg md:text-xl text-kinetic-muted-foreground transition-colors duration-300 group-hover:text-black/80 leading-tight max-w-md">
            {description}
          </p>
        )}
        
        {children && (
          <div className="mt-4 transition-colors duration-300 group-hover:text-black">
            {children}
          </div>
        )}
      </div>
    </MotionDiv>
  );
}
