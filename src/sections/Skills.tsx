"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { TextDecrypt } from "@/components/animations/TextDecrypt";
import { SectionWrapper } from "@/components/animations/SectionWrapper";

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
    category: "Languages",
    categoryIcon: <Code2 size={18} />,
    skills: [
      { name: "JavaScript", icon: <Code2 size={20} /> },
      { name: "Python", icon: <Terminal size={20} /> },
      { name: "Java", icon: <Code2 size={20} /> },
    ],
  },
  {
    category: "Frontend",
    categoryIcon: <Palette size={18} />,
    skills: [
      { name: "React.js", icon: <Code2 size={20} /> },
      { name: "Angular.js", icon: <Globe size={20} /> },
      { name: "HTML / CSS", icon: <Layers size={20} /> },
      { name: "Tailwind CSS", icon: <Palette size={20} /> },
    ],
  },
  {
    category: "Backend",
    categoryIcon: <Server size={18} />,
    skills: [
      { name: "Node.js", icon: <Server size={20} /> },
      { name: "Express.js", icon: <Globe size={20} /> },
      { name: "MongoDB", icon: <Database size={20} /> },
      { name: "MySQL", icon: <Database size={20} /> },
    ],
  },
];

const Skills: React.FC = () => {
  const [skillData, setSkillData] = useState<Record<string, { used: number; width: number }>>({});

  useEffect(() => {
    const data: Record<string, { used: number; width: number }> = {};
    skillGroups.forEach(group => {
      group.skills.forEach(skill => {
        data[skill.name] = {
          used: Math.floor(Math.random() * 20 + 80),
          width: Math.floor(Math.random() * 30 + 70)
        };
      });
    });
    setSkillData(data);
  }, []);

  return (
    <SectionWrapper id="skills" className="py-20 lg:py-32 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="flex flex-col gap-4 mb-20">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-kinetic-accent">
            <TextDecrypt text="[SYS_PROBE: 0x02_RESOURCE_ALLOCATION]" delay={0.2} />
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
            <TextDecrypt text="Stack & Weapons" delay={0.4} />
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none italic">
            <TextDecrypt text="TECHNOLOGIES" delay={0.6} /> <br />
            <span className="text-kinetic-border">
              <TextDecrypt text="I work with" delay={0.8} />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-kinetic-border bg-kinetic-border gap-px">
          {skillGroups.map((group, groupIdx) => (
            <div key={group.category} className="bg-kinetic-bg p-6 lg:p-12 flex flex-col gap-8 lg:gap-12 group">
              <div className="flex items-center justify-between border-b-2 border-kinetic-border pb-4">
                <div className="flex items-center gap-4">
                  <span className="text-kinetic-accent">{group.categoryIcon}</span>
                  <h3 className="font-display text-xl lg:text-3xl font-bold uppercase tracking-tighter">
                    <TextDecrypt text={group.category} delay={1.0} />
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
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.2 + groupIdx * 0.1 + skillIdx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-2 p-4 border-2 border-transparent hover:border-kinetic-accent hover:bg-kinetic-accent hover:text-black transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {skill.icon}
                        <span className="font-display text-lg md:text-xl font-bold uppercase tracking-tight">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] font-bold opacity-40">
                        {skillData[skill.name]?.used || 0}%_USED
                      </span>
                    </div>
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
    </SectionWrapper>
  );
};

export default Skills;
