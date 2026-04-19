"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/animations/SectionWrapper";
import { TextDecrypt } from "@/components/animations/TextDecrypt";

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
  return (
    <SectionWrapper id="experience" className="py-20 lg:py-32 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="flex flex-col gap-4 mb-20 text-right items-end">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
            <TextDecrypt text="Professional Path" delay={0.2} />
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none italic">
            <TextDecrypt text="Experience" delay={0.4} /><br />
            <span className="text-kinetic-border">
              <TextDecrypt text="Timeline" delay={0.6} />
            </span>
          </h2>
        </div>

        <div className="flex flex-col border-y-2 border-kinetic-border divide-y-2 divide-kinetic-border">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 + idx * 0.15 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center py-8 lg:py-12 px-4 lg:px-8 hover:bg-kinetic-accent transition-colors duration-300 hover:text-black"
            >
              {/* Year/Index */}
              <div className="lg:col-span-2 font-display text-lg lg:text-xl font-bold text-kinetic-muted-foreground group-hover:text-black/80 transition-colors mb-2 lg:mb-0">
                {exp.duration.split(" — ")[0]}
              </div>

              {/* Role & Company */}
              <div className="lg:col-span-5 flex flex-col mb-4 lg:mb-0">
                <h3 className="font-display text-2xl lg:text-4xl font-bold uppercase tracking-tighter text-kinetic-fg group-hover:text-black transition-colors">
                  {exp.role}
                </h3>
                <span className="font-display text-xs lg:text-sm font-bold uppercase tracking-widest text-kinetic-accent group-hover:text-black/80 transition-colors">
                  {exp.company}
                </span>
              </div>

              {/* Description */}
              <div className="lg:col-span-5 flex flex-col gap-4 font-mono text-xs md:text-sm lg:text-base leading-relaxed">
                <div className="flex gap-4 text-kinetic-muted-foreground group-hover:text-black/80 transition-colors">
                  <span className="text-kinetic-accent group-hover:text-black/40 font-bold select-none shrink-0">{">"}</span>
                  <p>{exp.description}</p>
                </div>
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
        <span className="font-display text-[12rem] lg:text-[25rem] font-bold leading-none tracking-tighter uppercase -rotate-90">
          HISTORY
        </span>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
