"use client";

import React from "react";
import FloatingAssistant from "@/components/FloatingAssistant";
import KineticShowcase from "@/sections/KineticShowcase";
import Landing from "@/sections/Landing";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-20 ml-10">
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
