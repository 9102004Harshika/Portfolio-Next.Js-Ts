"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import KineticButton from "@/components/KineticButton";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: <Github size={24} />, href: "#", label: "GITHUB" },
  { icon: <Linkedin size={24} />, href: "#", label: "LINKEDIN" },
  { icon: <Twitter size={24} />, href: "#", label: "TWITTER" },
];

const Contact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6 lg:px-20 text-kinetic-fg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Headline & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col gap-4"
            >
              <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
                Available Now
              </span>
              <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none italic">
                Let&apos;s<br />
                <span className="text-kinetic-accent">Connect</span>
              </h2>
              <p className="font-sans text-xl md:text-2xl text-kinetic-muted-foreground leading-tight max-w-sm mt-4">
                Have a project in mind or want to collaborate? I&apos;d love to hear from you.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-kinetic-muted">Social Channels</span>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border-2 border-kinetic-border hover:bg-kinetic-accent hover:text-black transition-all duration-300 group"
                  >
                    {link.icon}
                    <span className="font-display font-bold uppercase tracking-tighter">{link.label}</span>
                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Massive Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-12"
            >
              <div className="group relative">
                <input 
                  type="text" 
                  placeholder="NAME"
                  className="w-full h-24 bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors"
                />
              </div>

              <div className="group relative">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS"
                  className="w-full h-24 bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors"
                />
              </div>

              <div className="group relative">
                <textarea 
                  placeholder="YOUR MESSAGE"
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors resize-none py-4"
                />
              </div>

              <div className="flex flex-col gap-4">
                <KineticButton variant="primary" size="lg" className="w-full md:w-fit">
                  SEND MESSAGE [UPLOAD_DATA]
                </KineticButton>
                <span className="font-display text-[10px] text-kinetic-muted font-bold tracking-widest">
                  ENCRYPTED_TRANSMISSION_ACTIVE_V1.0
                </span>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-16 border-t-2 border-kinetic-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-display font-bold uppercase tracking-tighter flex items-center gap-4">
            <span className="text-4xl text-kinetic-accent">HARSHIKA</span>
            <span className="text-sm text-kinetic-muted-foreground">© 2026 // ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex gap-8 font-display text-xs font-bold uppercase tracking-widest text-kinetic-muted-foreground">
            <a href="#landing" className="hover:text-kinetic-accent">Top</a>
            <a href="#about" className="hover:text-kinetic-accent">About</a>
            <a href="#projects" className="hover:text-kinetic-accent">Works</a>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 select-none pointer-events-none opacity-5">
        <span className="font-display text-[20rem] font-bold leading-none tracking-tighter uppercase translate-y-1/2">
          HELLO
        </span>
      </div>
    </section>
  );
};

export default Contact;
