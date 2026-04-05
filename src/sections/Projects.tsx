"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import KineticCard from "@/components/KineticCard";
import KineticButton from "@/components/KineticButton";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "TaskFlow",
    shortDesc: "A collaborative project management app with real-time updates and smart task prioritization.",
    fullDesc: "TaskFlow is a full-featured project management platform designed for modern development teams. It features real-time collaboration powered by WebSockets, drag-and-drop kanban boards, smart AI-based task prioritization, and comprehensive project analytics.",
    tags: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    github: "#",
    live: "#",
  },
  {
    title: "CodeLens",
    shortDesc: "An AI-powered code review tool that identifies quality issues and suggests improvements.",
    fullDesc: "CodeLens integrates directly into your development workflow to provide AI-driven code reviews. Using OpenAI's GPT models and custom fine-tuned analysis, it can detect code smells, suggest refactors, and ensure consistency with your project's style guide.",
    tags: ["Python", "FastAPI", "OpenAI", "React"],
    github: "#",
    live: "#",
  },
  {
    title: "DevConnect",
    shortDesc: "A social platform for developers to share projects, collaborate, and find opportunities.",
    fullDesc: "DevConnect is a purpose-built social platform for the developer community. Built with Next.js and GraphQL, it features project showcases, real-time messaging, skill-based matching, and community-driven code reviews.",
    tags: ["Next.js", "GraphQL", "MongoDB", "TypeScript"],
    github: "#",
    live: "#",
  },
  {
    title: "QuantumVault",
    shortDesc: "A secure password manager with zero-knowledge encryption and cross-platform sync.",
    fullDesc: "QuantumVault provides enterprise-grade password management with zero-knowledge architecture. All encryption happens client-side using AES-256-GCM, ensuring even the server never sees plaintext data.",
    tags: ["Rust", "React Native", "SQLite", "AWS"],
    github: "#",
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 lg:py-32 px-4 lg:px-20 text-kinetic-fg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col gap-4 mb-20"
        >
          <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
            Selected Works
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none">
            Things I&apos;ve<br />
            <span className="text-kinetic-accent italic">Built</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <KineticCard
                title={project.title}
                description={project.shortDesc}
                number={`0${idx + 1}`}
                className="h-full"
              >
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="font-display text-[10px] font-bold uppercase tracking-widest border border-kinetic-border px-2 py-1 group-hover:border-black group-hover:text-black transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </KineticCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal (Brutalist style) */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-kinetic-bg/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative w-full max-w-4xl bg-kinetic-bg border-2 md:border-4 border-kinetic-accent p-6 sm:p-8 lg:p-16 flex flex-col gap-6 lg:gap-8 shadow-[10px_10px_0px_#DFE104] md:shadow-[20px_20px_0px_#DFE104] max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 hover:bg-kinetic-accent hover:text-kinetic-bg transition-colors border-2 border-transparent hover:border-kinetic-accent"
            >
              <X className="h-6 w-6 lg:h-8 lg:w-8" />
            </button>

            <div className="flex flex-col gap-2">
              <span className="font-display text-xs lg:text-sm font-bold uppercase tracking-widest text-kinetic-accent">
                Project Detail
              </span>
              <h3 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tighter text-kinetic-fg">
                {selectedProject.title}
              </h3>
            </div>

            <p className="font-sans text-lg lg:text-2xl text-kinetic-muted-foreground leading-tight max-w-3xl">
              {selectedProject.fullDesc}
            </p>

            <div className="flex flex-col gap-4">
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-kinetic-muted">Tech Stack</span>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="font-display text-[10px] lg:text-sm font-bold uppercase tracking-widest border-2 border-kinetic-border px-3 py-1.5 lg:px-4 lg:py-2 text-kinetic-fg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-8">
              {selectedProject.live && (
                <KineticButton variant="primary" size="lg" onClick={() => window.open(selectedProject.live, "_blank")} className="w-full sm:w-auto">
                  Live Demo <ExternalLink className="ml-4 h-5 w-5 lg:h-6 lg:w-6" />
                </KineticButton>
              )}
              {selectedProject.github && (
                <KineticButton variant="outline" size="lg" onClick={() => window.open(selectedProject.github, "_blank")} className="w-full sm:w-auto">
                  Source Code <Github className="ml-4 h-5 w-5 lg:h-6 lg:w-6" />
                </KineticButton>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Background Graphic */}
      <div className="absolute top-0 right-0 select-none pointer-events-none opacity-5">
        <span className="font-display text-[12rem] lg:text-[30rem] font-bold leading-none tracking-tighter uppercase">
          Work
        </span>
      </div>
    </section>
  );
};

export default Projects;
