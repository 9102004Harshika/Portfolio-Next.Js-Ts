"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import FloatingAssistant from "@/components/FloatingAssistant";
import KineticShowcase from "@/sections/KineticShowcase";
import Availability from "@/sections/Availability";
import Landing from "@/sections/Landing";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Availability />
      <div className="h-14" /> {/* Spacer matched to marquee height to prevent overlap */}
      <main className="flex flex-col gap-20">
        <Landing />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <FloatingAssistant />
    </>
  );
}
