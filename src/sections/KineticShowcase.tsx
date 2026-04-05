"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KineticButton from "@/components/KineticButton";
import KineticCard from "@/components/KineticCard";
import KineticMarquee from "@/components/KineticMarquee";
import { ArrowRight, Star, Zap, Code, Layout, Sparkles } from "lucide-react";

export default function KineticShowcase() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const features = [
    {
      title: "Hyper Motion",
      description: "Relentless energy through infinite marquees and reactive transitions.",
      number: "01",
    },
    {
      title: "Brutal Scale",
      description: "Typography that commands attention with aggressive viewport scaling.",
      number: "02",
    },
    {
      title: "Pure Contrast",
      description: "High-visibility acid yellow paired with rich, textured blacks.",
      number: "03",
    },
  ];

  return (
    <section className="relative min-h-screen bg-kinetic-bg text-kinetic-fg overflow-hidden border-t-2 border-kinetic-border">
      {/* Hero Section */}
      <div className="relative z-10 py-32 px-4 md:px-8 flex flex-col items-start gap-12">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="w-full flex flex-col gap-4"
        >
          <span className="font-display text-sm md:text-xl font-bold uppercase tracking-widest text-kinetic-accent">
            Design System Integration
          </span>
          <h1 className="font-display text-[clamp(3.5rem,12vw,14rem)] font-bold uppercase tracking-tighter leading-[0.85] italic">
            Kinetic<br />
            <span className="text-kinetic-accent animate-pulse-glow">Type</span>graphy
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-[95vw]">
          <p className="font-sans text-xl md:text-3xl text-kinetic-muted-foreground max-w-2xl leading-tight">
            A high-energy brutalist aesthetic where typography becomes the visual structure. Built for performance, designed for impact.
          </p>
          <div className="flex flex-wrap gap-4 mt-auto">
            <KineticButton variant="primary" size="lg">
              Explore Now <ArrowRight className="ml-4 h-6 w-6" />
            </KineticButton>
            <KineticButton variant="outline" size="lg">
              Documentation
            </KineticButton>
          </div>
        </div>
      </div>

      {/* Stats Marquee */}
      <KineticMarquee speed={100} bgVariant="accent" className="border-y-2 border-kinetic-accent">
        <span className="flex items-center gap-4">60FPS MOTION <Zap className="fill-current" /></span>
        <span className="flex items-center gap-4">BRUTALIST GRID <Layout className="fill-current" /></span>
        <span className="flex items-center gap-4">ACID YELLOW <Sparkles className="fill-current" /></span>
        <span className="flex items-center gap-4">VARIABLE TYPE <Code className="fill-current" /></span>
      </KineticMarquee>

      {/* Features Grid */}
      <div className="py-32 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-kinetic-border border-2 border-kinetic-border">
          {features.map((feature, index) => (
            <KineticCard 
              key={index}
              title={feature.title}
              description={feature.description}
              number={feature.number}
              className="h-full border-0"
            />
          ))}
        </div>
      </div>

      {/* Quotes Marquee */}
      <KineticMarquee speed={40} className="py-20">
        <div className="flex items-center gap-12 italic text-kinetic-muted-foreground/40 text-5xl md:text-7xl">
          <span>"TYPOGRAPHY IS NOT DECORATION"</span>
          <Star className="h-12 w-12" />
          <span>"MOTION IS RHYTHM"</span>
          <Star className="h-12 w-12" />
          <span>"EVERY ELEMENT IS ALIVE"</span>
          <Star className="h-12 w-12" />
        </div>
      </KineticMarquee>

      {/* Massive Graphic Number Background */}
      <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 select-none pointer-events-none opacity-5">
        <span className="font-display text-[40rem] font-bold leading-none tracking-tighter">
          2026
        </span>
      </div>
    </section>
  );
}
