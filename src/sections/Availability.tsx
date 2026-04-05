"use client";

import React from "react";
import KineticMarquee from "@/components/KineticMarquee";
import { Star } from "lucide-react";

const Availability: React.FC = () => {
  return (
    <section className="fixed top-0 left-0 w-full z-[100] border-b-2 border-kinetic-border bg-kinetic-bg overflow-hidden py-2">
      <KineticMarquee speed={30} className="">
        <span className="flex items-center gap-4 text-xs md:text-sm font-display font-bold uppercase tracking-tighter italic">
          AVAILABLE FOR OPPORTUNITIES <Star className="h-3 w-3 fill-kinetic-accent text-kinetic-accent" />
        </span>
        <span className="flex items-center gap-4 text-xs md:text-sm font-display font-bold uppercase tracking-tighter italic">
          OPEN TO COLLAB <Star className="h-3 w-3 fill-kinetic-accent text-kinetic-accent" />
        </span>
      </KineticMarquee>
    </section>
  );
};

export default Availability;
