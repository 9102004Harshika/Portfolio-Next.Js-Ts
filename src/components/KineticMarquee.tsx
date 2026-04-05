"use client";

import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KineticMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  bgVariant?: "transparent" | "accent" | "muted";
}

export default function KineticMarquee({
  children,
  speed = 60,
  direction = "left",
  className,
  bgVariant = "transparent",
}: KineticMarqueeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgStyles = {
    transparent: "",
    accent: "bg-kinetic-accent text-kinetic-accent-foreground py-4",
    muted: "bg-kinetic-muted text-kinetic-fg py-4",
  };

  return (
    <div className={cn("w-full overflow-hidden select-none", bgStyles[bgVariant], className)}>
      {mounted ? (
        <Marquee
          speed={speed}
          direction={direction}
          gradient={false}
          autoFill={true}
          play={true}
        >
          <div className="flex items-center gap-8 px-4 font-display font-bold uppercase tracking-tighter text-4xl md:text-6xl lg:text-8xl">
            {children}
          </div>
        </Marquee>
      ) : (
        <div className="flex items-center gap-8 px-4 font-display font-bold uppercase tracking-tighter text-4xl md:text-6xl lg:text-8xl invisible">
          {children}
        </div>
      )}
    </div>
  );
}
