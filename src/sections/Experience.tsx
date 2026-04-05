"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import KineticCard from "@/components/KineticCard";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "TechCorp",
    duration: "2024 — Present",
    description: "Leading frontend architecture for a SaaS platform serving 50K+ users. Implemented component library, CI/CD pipelines, and reduced bundle size by 40% through code splitting and lazy loading.",
  },
  {
    role: "Full-Stack Developer",
    company: "InnovateLab",
    duration: "2022 — 2024",
    description: "Built end-to-end features for an AI-powered analytics platform. Designed RESTful APIs with Node.js, implemented real-time dashboards with React, and managed PostgreSQL databases.",
  },
  {
    role: "Junior Developer",
    company: "StartupHub",
    duration: "2020 — 2022",
    description: "Contributed to multiple client projects across web and mobile. Developed responsive UIs, integrated third-party APIs, and collaborated in agile sprints.",
  },
];

const Experience: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 px-6 lg:px-20 text-kinetic-fg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col gap-4 mb-20 text-right items-end"
        >
          <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
            Professional Path
          </span>
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none italic">
            Experience<br />
            <span className="text-kinetic-border">Timeline</span>
          </h2>
        </motion.div>

        <div className="flex flex-col border-y-2 border-kinetic-border divide-y-2 divide-kinetic-border">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.15 }}
              className="group relative grid grid-cols-1 md:grid-cols-12 items-center py-12 px-4 md:px-8 hover:bg-kinetic-accent transition-colors duration-300 hover:text-black"
            >
              {/* Year/Index */}
              <div className="md:col-span-2 font-display text-xl font-bold text-kinetic-muted-foreground group-hover:text-black/80 transition-colors">
                {exp.duration.split(" — ")[0]}
              </div>

              {/* Role & Company */}
              <div className="md:col-span-5 flex flex-col">
                <h3 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tighter text-kinetic-fg group-hover:text-black transition-colors">
                  {exp.role}
                </h3>
                <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent group-hover:text-black/80 transition-colors">
                  {exp.company}
                </span>
              </div>

              {/* Description */}
              <div className="md:col-span-5 mt-4 md:mt-0 font-sans text-lg md:text-xl text-kinetic-muted-foreground group-hover:text-black/80 transition-colors leading-tight">
                {exp.description}
              </div>

              {/* Decorative Number on Hover */}
              <span className="absolute right-8 bottom-0 font-display text-8xl font-bold text-black/5 opacity-0 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
                0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-0 left-0 -translate-x-1/3 select-none pointer-events-none opacity-5">
        <span className="font-display text-[25rem] font-bold leading-none tracking-tighter uppercase -rotate-90">
          HISTORY
        </span>
      </div>
    </section>
  );
};

export default Experience;
