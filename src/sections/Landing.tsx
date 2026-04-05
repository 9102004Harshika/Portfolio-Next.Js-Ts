"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import KineticButton from "@/components/KineticButton";
import KineticMarquee from "@/components/KineticMarquee";
import { ArrowRight, Star } from "lucide-react";

const Landing: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      id="landing"
      className="relative min-h-[90vh] text-kinetic-fg overflow-hidden flex flex-col justify-center py-32 px-6 lg:px-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Massive Typography */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-kinetic-accent" />
                <span className="font-display text-sm md:text-base font-bold uppercase tracking-widest text-kinetic-accent">
                  Full-Stack Developer & Creative Technologist
                </span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,10vw,8rem)] font-bold uppercase tracking-tighter leading-none mix-blend-difference">
                Harsh<span className="italic text-kinetic-accent">ika</span><span className="text-kinetic-border">.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.2 }}
              className="font-sans text-xl md:text-3xl text-kinetic-muted-foreground max-w-2xl leading-tight"
            >
              Building high-performance applications with clean architectures and memorable user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <KineticButton variant="primary" size="lg" onClick={() => window.location.hash = "#projects"}>
                View Projects <ArrowRight className="ml-4 h-6 w-6" />
              </KineticButton>
              <KineticButton variant="outline" size="lg" onClick={() => window.location.hash = "#contact"}>
                Get In Touch
              </KineticButton>
            </motion.div>
          </div>

          {/* Right Side: Dynamic Character Frame */}
          <div className="lg:col-span-4 relative h-[500px] md:h-[600px] lg:h-[700px]">
            <motion.div
              style={{ y: y1 }}
              initial={{ rotate: -12, opacity: 0 }}
              animate={{ rotate: -12, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-10 left-0 w-full aspect-square border-2 border-kinetic-accent z-0"
            />
            <motion.div
              style={{ y: y2 }}
              className="relative z-10 w-full h-full"
            >
              <Image
                src="/assets/harshika_themed.png"
                alt="Harshika"
                fill
                className="object-contain filter contrast-125"
                priority
              />
            </motion.div>

            {/* Background Decorative Numbers */}
            <div className="absolute -bottom-20 -right-20 select-none pointer-events-none opacity-10">
              <span className="font-display text-[20rem] font-bold text-kinetic-muted leading-none">
                04
              </span>
            </div>
          </div>
        </div>
      </div>



      {/* Bottom Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-xs uppercase tracking-widest text-kinetic-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-kinetic-border shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
      </motion.div>
    </section>
  );
};

export default Landing;
