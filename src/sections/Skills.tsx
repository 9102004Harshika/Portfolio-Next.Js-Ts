"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Server,
  Wrench,
  Palette,
  Globe,
  Database,
  Layers,
  GitBranch,
  Container,
  Figma,
  Cloud,
  Terminal,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroup {
  category: string;
  categoryIcon: React.ReactNode;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    categoryIcon: <Palette size={18} />,
    skills: [
      { name: "React", icon: <Code2 size={20} /> },
      { name: "TypeScript", icon: <Terminal size={20} /> },
      { name: "Next.js", icon: <Globe size={20} /> },
      { name: "HTML / CSS", icon: <Layers size={20} /> },
    ],
  },
  {
    category: "Backend",
    categoryIcon: <Server size={18} />,
    skills: [
      { name: "Node.js", icon: <Server size={20} /> },
      { name: "Python", icon: <Terminal size={20} /> },
      { name: "PostgreSQL", icon: <Database size={20} /> },
      { name: "REST APIs", icon: <Globe size={20} /> },
    ],
  },
  {
    category: "Tools",
    categoryIcon: <Wrench size={18} />,
    skills: [
      { name: "Git", icon: <GitBranch size={20} /> },
      { name: "Docker", icon: <Container size={20} /> },
      { name: "Figma", icon: <Figma size={20} /> },
      { name: "AWS", icon: <Cloud size={20} /> },
    ],
  },
];

const Skills: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 lg:py-32 px-4 lg:px-20 text-kinetic-fg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col gap-4 mb-20"
        >
          <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
            Stack & Weapons
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none italic">
            Technologies<br />
            <span className="text-kinetic-border">I work with</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-kinetic-border bg-kinetic-border gap-px">
          {skillGroups.map((group, groupIdx) => (
            <div key={group.category} className="bg-kinetic-bg p-6 lg:p-12 flex flex-col gap-8 lg:gap-12 group">
              <div className="flex items-center justify-between border-b-2 border-kinetic-border pb-4">
                <div className="flex items-center gap-4">
                  <span className="text-kinetic-accent">{group.categoryIcon}</span>
                  <h3 className="font-display text-xl lg:text-3xl font-bold uppercase tracking-tighter">
                    {group.category}
                  </h3>
                </div>
                <span className="font-display text-xs font-bold text-kinetic-muted-foreground group-hover:text-kinetic-accent transition-colors">
                  {group.skills.length} UNITS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: groupIdx * 0.1 + skillIdx * 0.05 }}
                    className="flex items-center justify-between p-4 border-2 border-transparent hover:border-kinetic-accent hover:bg-kinetic-accent hover:text-black transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {skill.icon}
                      <span className="font-display text-lg md:text-xl font-bold uppercase tracking-tight">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-display text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      SYSTEM_READY
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Massive Number */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 select-none pointer-events-none opacity-5">
        <span className="font-display text-[12rem] lg:text-[25rem] font-bold leading-none rotate-90">
          STACK
        </span>
      </div>
    </section>
  );
};

export default Skills;
