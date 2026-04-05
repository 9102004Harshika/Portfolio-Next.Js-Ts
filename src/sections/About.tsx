"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import KineticCard from "@/components/KineticCard";

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "3+", label: "YEARS EXPERIENCE", number: "01" },
    { value: "20+", label: "PROJECTS BUILT", number: "02" },
    { value: "10+", label: "TECHNOLOGIES", number: "03" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 lg:px-20 text-kinetic-fg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Story */}
          <div className="lg:col-span-7 flex flex-col gap-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col gap-6"
            >
              <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
                About Me
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                Building software that<br />
                <span className="text-kinetic-accent">makes a difference.</span>
              </h2>

              <div className="flex flex-col gap-6 max-w-2xl font-sans text-xl md:text-2xl text-kinetic-muted-foreground leading-tight">
                <p>
                  I&apos;m a passionate full-stack developer with a deep love for
                  crafting elegant solutions to complex problems. My journey in tech
                  evolved into a mission to build products that are technically excellent and delightful to use.
                </p>
                <p>
                  With experience spanning frontend frameworks, backend systems, and
                  cloud infrastructure, I bring a holistic approach to every project, focused on clean architecture and relentless attention to detail.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Brutalist Code Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, rotate: 5 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <KineticCard
                title="System Info"
                className="min-h-[500px] border-kinetic-accent/50"
              >
                <div className="font-display text-sm md:text-base leading-relaxed overflow-x-auto whitespace-pre-wrap transition-colors duration-300 group-hover:text-black">
                  <span className="text-kinetic-accent transition-colors duration-300 group-hover:text-black font-bold">const</span> <span className="text-kinetic-fg transition-colors duration-300 group-hover:text-black">harshika</span> = &#123;
                  <br />
                  &nbsp;&nbsp;<span className="text-kinetic-muted-foreground transition-colors duration-300 group-hover:text-black">role</span>: <span className="text-kinetic-accent transition-colors duration-300 group-hover:text-black">&quot;Full-Stack Developer&quot;</span>,
                  <br />
                  &nbsp;&nbsp;<span className="text-kinetic-muted-foreground transition-colors duration-300 group-hover:text-black">passion</span>: <span className="text-kinetic-accent transition-colors duration-300 group-hover:text-black">&quot;Creative Tech&quot;</span>,
                  <br />
                  &nbsp;&nbsp;<span className="text-kinetic-muted-foreground transition-colors duration-300 group-hover:text-black">focus</span>: [
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-kinetic-accent transition-colors duration-300 group-hover:text-black">&quot;Clean Architecture&quot;</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-kinetic-accent transition-colors duration-300 group-hover:text-black">&quot;User Experience&quot;</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-kinetic-accent transition-colors duration-300 group-hover:text-black">&quot;Performance&quot;</span>
                  <br />
                  &nbsp;&nbsp;],
                  <br />
                  &nbsp;&nbsp;<span className="text-kinetic-muted-foreground transition-colors duration-300 group-hover:text-black">motto</span>: <span className="text-kinetic-accent transition-colors duration-300 group-hover:text-black">&quot;Build it right.&quot;</span>
                  <br />
                  &#125;;
                </div>
              </KineticCard>
            </motion.div>

            {/* Background Massive Number */}
            <div className="absolute -top-12 -right-12 select-none pointer-events-none opacity-5">
              <span className="font-display text-[15rem] font-bold leading-none">
                ME
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Centered & Balanced */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
          className="mt-40 w-full flex justify-center"
          suppressHydrationWarning
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl" suppressHydrationWarning>
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 py-20 px-8 lg:py-[40px] lg:px-12 border-2 border-kinetic-border hover:border-kinetic-accent hover:bg-kinetic-accent hover:text-black transition-all duration-500 group relative overflow-hidden" suppressHydrationWarning>
                <div className="font-display text-6xl lg:text-7xl font-bold group-hover:scale-110 transition-transform duration-500 relative z-10 leading-none">
                  {stat.value}
                </div>
                <div className="font-display text-sm lg:text-lg font-bold uppercase tracking-[0.2em] relative z-10 transition-colors duration-500 group-hover:text-black">
                  {stat.label}
                </div>
                {/* Decorative background number */}
                <span className="absolute -bottom-6 -right-6 font-display text-[8rem] font-bold opacity-[0.03] group-hover:opacity-10 transition-opacity group-hover:text-black">
                  {stat.number}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
