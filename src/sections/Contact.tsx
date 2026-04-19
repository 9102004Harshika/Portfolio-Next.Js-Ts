"use client";

import React from "react";
import { motion } from "framer-motion";
import KineticButton from "@/components/KineticButton";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { TextDecrypt } from "@/components/animations/TextDecrypt";
import { SectionWrapper } from "@/components/animations/SectionWrapper";

const socialLinks = [
  { icon: <Github size={24} />, href: "#", label: "GITHUB" },
  { icon: <Linkedin size={24} />, href: "#", label: "LINKEDIN" },
  { icon: <Twitter size={24} />, href: "#", label: "TWITTER" },
];

const Contact: React.FC = () => {
  return (
    <SectionWrapper id="contact" className="py-20 lg:py-32 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Headline & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
                <TextDecrypt text="Available Now" delay={0.2} />
              </span>
              <h2 className="font-display text-[clamp(4.5rem,10vw,8rem)] lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none italic">
                <TextDecrypt text="LET'S" delay={0.4} /> <br />
                <span className="text-kinetic-accent">
                   <TextDecrypt text="CONNECT" delay={0.6} />
                </span>
              </h2>
              <p className="font-sans text-lg lg:text-2xl text-kinetic-muted-foreground leading-tight max-w-sm mt-4">
                Have a project in mind or want to collaborate? I&apos;d love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-kinetic-muted">Social Channels</span>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 border-2 border-kinetic-border hover:bg-kinetic-accent hover:text-black transition-all duration-300 group flex-1 md:flex-none justify-center md:justify-start"
                  >
                    {link.icon}
                    <span className="font-display font-bold uppercase tracking-tighter text-sm lg:text-base">{link.label}</span>
                    <ArrowUpRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Massive Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
              viewport={{ once: true }}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-12"
            >
              <div className="group relative">
                <input 
                  type="text" 
                  placeholder="NAME"
                  className="w-full h-16 lg:h-24 bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-2xl lg:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors"
                />
              </div>

              <div className="group relative">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS"
                  className="w-full h-16 lg:h-24 bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-2xl lg:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors"
                />
              </div>

              <div className="group relative">
                <textarea 
                  placeholder="YOUR MESSAGE"
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-2xl lg:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors resize-none py-4"
                />
              </div>

              <div className="flex flex-col gap-4">
                <KineticButton variant="primary" size="lg" className="w-full md:w-fit">
                  SEND_MESSAGE [UPLOAD_DATA]
                </KineticButton>
                <span className="font-display text-[10px] text-kinetic-muted font-bold tracking-widest">
                  [SYSTEM_STATE: ENCRYPTED_TRANSMISSION_ACTIVE_V1.0]
                </span>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 lg:mt-32 pt-12 lg:pt-16 border-t-2 border-kinetic-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-display font-bold uppercase tracking-tighter flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-3xl lg:text-4xl text-kinetic-accent leading-none">HARSHIKA</span>
            <span className="text-[10px] lg:text-sm text-kinetic-muted-foreground opacity-50 tracking-widest">
               [AUTH: © 2026 // ALL_RIGHTS_RESERVED]
            </span>
          </div>
          <div className="flex gap-8 font-display text-xs font-bold uppercase tracking-widest text-kinetic-muted-foreground">
            <a href="#landing" className="hover:text-kinetic-accent transition-colors">[GOTO: TOP]</a>
            <a href="#about" className="hover:text-kinetic-accent transition-colors">[GOTO: ABOUT]</a>
            <a href="#projects" className="hover:text-kinetic-accent transition-colors">[GOTO: WORKS]</a>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 select-none pointer-events-none opacity-5">
        <span className="font-display text-[10rem] lg:text-[20rem] font-bold leading-none tracking-tighter uppercase translate-y-1/2">
          HELLO
        </span>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
