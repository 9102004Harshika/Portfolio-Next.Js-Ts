"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KineticCard from "@/components/KineticCard";
import KineticButton from "@/components/KineticButton";
import { ExternalLink, Github, X } from "lucide-react";
import { SectionWrapper } from "@/components/animations/SectionWrapper";
import { TextDecrypt } from "@/components/animations/TextDecrypt";

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

  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <SectionWrapper id="projects" className="py-20 lg:py-32 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="flex flex-col gap-4 mb-20">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
            <TextDecrypt text="Selected Works" delay={0.2} />
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none">
            <TextDecrypt text="Things I've" delay={0.4} /><br />
            <span className="text-kinetic-accent italic">
               <TextDecrypt text="Built" delay={0.6} />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 + idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <KineticCard
                title={project.title}
                description={project.shortDesc}
                number={`0${idx + 1}`}
                className="h-full"
              >
                <div className="flex flex-wrap gap-3 mt-10">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] bg-kinetic-muted border border-kinetic-border/50 px-4 py-2 transition-all duration-300 group-hover:bg-black group-hover:text-kinetic-accent group-hover:border-black"
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
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100001] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, clipPath: "inset(0 100% 0 0)" }}
              animate={{ scale: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
              exit={{ scale: 0.95, y: 20, clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-kinetic-bg border-4 border-kinetic-accent p-6 sm:p-8 lg:p-16 flex flex-col gap-6 lg:gap-8 shadow-[20px_20px_0px_rgba(223,225,4,0.3)] max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 hover:bg-kinetic-accent hover:text-kinetic-bg transition-colors border-2 border-transparent hover:border-kinetic-accent"
              >
                <X className="h-6 w-6 lg:h-8 lg:w-8" />
              </button>

              <div className="flex flex-col gap-2">
                <span className="font-display text-xs lg:text-sm font-bold uppercase tracking-widest text-kinetic-accent">
                  [DATA_PACKET_ID: 0x{Math.random().toString(16).slice(2, 6).toUpperCase()}]
                </span>
                <h3 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tighter text-kinetic-fg">
                   <TextDecrypt text={selectedProject.title} />
                </h3>
              </div>

              <p className="font-sans text-lg lg:text-2xl text-kinetic-muted-foreground leading-tight max-w-3xl">
                {selectedProject.fullDesc}
              </p>

              <div className="flex flex-col gap-4">
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-kinetic-muted">Hardware Stack</span>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="font-display text-[10px] lg:text-sm font-bold uppercase tracking-widest border-2 border-kinetic-border px-3 py-1.5 lg:px-4 lg:py-2 text-kinetic-fg bg-kinetic-muted/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-8">
                {selectedProject.live && (
                  <KineticButton variant="primary" size="lg" onClick={() => window.open(selectedProject.live, "_blank")} className="w-full sm:w-auto">
                    CONNECT_NODE [LIVE] <ExternalLink className="ml-4 h-5 w-5 lg:h-6 lg:w-6" />
                  </KineticButton>
                )}
                {selectedProject.github && (
                  <KineticButton variant="outline" size="lg" onClick={() => window.open(selectedProject.github, "_blank")} className="w-full sm:w-auto">
                    DUMP_REPO [GRIB] <Github className="ml-4 h-5 w-5 lg:h-6 lg:w-6" />
                  </KineticButton>
                )}
              </div>
              
              {/* Decorative scanline for modal */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Graphic */}
      <div className="absolute top-0 right-0 select-none pointer-events-none opacity-5">
        <span className="font-display text-[12rem] lg:text-[30rem] font-bold leading-none tracking-tighter uppercase">
          Work
        </span>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
