"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TextDecrypt } from "./animations/TextDecrypt";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AboutCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  number?: string;
}

export default function AboutCard({
  title,
  description,
  number,
  className,
  children,
  ...props
}: AboutCardProps) {
  const MotionDiv = motion.div as any;

  return (
    <MotionDiv
      className={cn(
        "group relative flex flex-col border-2 border-kinetic-border bg-black transition-all duration-500 hover:border-kinetic-accent hover:shadow-[0_0_40px_rgba(223,225,4,0.1)] overflow-hidden",
        className
      )}
      style={{ borderRadius: "0px" }}
      {...props}
    >
      {/* OS Header - Breadcrumbs style */}
      <div className="flex items-center justify-between border-b-2 border-kinetic-border bg-black px-6 py-4 group-hover:border-kinetic-accent transition-colors duration-500">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-kinetic-border transition-colors duration-500 group-hover:bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-kinetic-border transition-colors duration-500 group-hover:bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-kinetic-border transition-colors duration-500 group-hover:bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-kinetic-muted-foreground flex items-center gap-3">
              <span className="opacity-30">~/PROJECTS/</span>
              <span className="text-kinetic-accent">
                <TextDecrypt text={`${title.toUpperCase()}.SYS`} />
              </span>
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="h-1 w-8 bg-kinetic-border rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-kinetic-accent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="font-mono text-[8px] font-bold tracking-widest text-kinetic-muted-foreground opacity-40 uppercase">STATUS: LIVE</span>
        </div>
      </div>

      <div className="relative flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center min-h-[300px] gap-8 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(223,225,4,0.03)_0%,transparent_100%)]">
        {/* Dot Grid Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[radial-gradient(var(--color-kinetic-border)_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* Project Number (Outlined & Massive) */}
        {number && (
          <span className="absolute -bottom-10 -right-6 font-display text-[15rem] font-black leading-none text-transparent kinetic-text-stroke opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700 select-none pointer-events-none italic">
            {number}
          </span>
        )}
        
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 opacity-30">
              <span className="w-4 h-[1px] bg-kinetic-accent" />
              <span className="font-mono text-[8px] font-bold tracking-[0.4em] uppercase text-kinetic-accent">
                INIT_PROJECT_0{number}
              </span>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-[2px] shrink-0 bg-kinetic-border group-hover:bg-kinetic-accent/30 transition-colors" />
            
            <div className="flex flex-col gap-8">
              <h3 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-kinetic-fg transition-all duration-500 group-hover:text-kinetic-accent group-hover:translate-x-2">
                <TextDecrypt text={title} />
              </h3>
              
              {description && (
                <p className="font-sans text-lg text-kinetic-muted-foreground leading-tight max-w-md transition-colors group-hover:text-kinetic-fg/90">
                  {description}
                </p>
              )}
              
              {children && (
                <div className="transition-colors duration-500">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-kinetic-border transition-colors group-hover:border-kinetic-accent" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-kinetic-border transition-colors group-hover:border-kinetic-accent" />

      {/* Decorative scanline effect specific to card */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] group-hover:opacity-[0.05] transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
    </MotionDiv>
  );
}
