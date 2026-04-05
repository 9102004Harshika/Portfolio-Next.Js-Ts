"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Activity, Clock, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about", code: "01" },
  { label: "Skills", href: "#skills", code: "02" },
  { label: "Works", href: "#projects", code: "03" },
  { label: "Path", href: "#experience", code: "04" },
  { label: "Connect", href: "#contact", code: "05" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "skills", "projects", "experience", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 24, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4"
    >
      <div className={`
        relative flex items-center gap-4 md:gap-8 px-6 py-3
        bg-kinetic-bg/60 backdrop-blur-xl border border-kinetic-border
        shadow-[0_0_30px_rgba(223,225,4,0.15)]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled ? "rounded-full py-2 px-4 scale-95 md:scale-100" : "rounded-2xl"}
      `}>
        {/* Glow Effect Surround */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-kinetic-accent/10 via-transparent to-accent/10 opacity-50 pointer-events-none" />

        {/* HUD: Logo / Status */}
        <div className="flex items-center gap-3 pr-4 border-r border-kinetic-border/50">
          <a
            href="#landing"
            className="group relative flex items-center justify-center h-10 w-10 bg-kinetic-bg text-kinetic-accent hover:text-black border border-kinetic-border font-display text-xl font-black italic tracking-tighter overflow-hidden skew-x-[-12deg] transition-colors duration-300"
          >
            <motion.span
              animate={{ x: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: Math.random() * 2 }}
              className="relative z-10"
            >
              H.
            </motion.span>
            <div className="absolute inset-0 bg-kinetic-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <div className="hidden lg:flex flex-col">
            <span className="font-display text-[8px] font-bold text-kinetic-muted leading-tight uppercase tracking-widest">User_Authorized</span>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-kinetic-accent animate-pulse shadow-[0_0_8px_var(--color-kinetic-accent)]" />
              <span className="font-display text-[10px] font-black text-kinetic-fg tracking-tighter">OS_CONNECTED</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");

            return (
              <a
                key={link.href}
                href={link.href}
                className={`
                  relative min-w-[90px] md:min-w-[130px] px-6 md:px-8 py-3.5 md:py-4 rounded-full font-display text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.15em]
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden group flex items-center justify-center
                  ${isActive ? "text-black" : "text-kinetic-muted-foreground hover:text-kinetic-fg"}
                `}
              >
                <span className="relative z-10">{link.label}</span>
                {/* HUD Code deco */}
                <span className={`absolute top-2 right-3 md:top-2 md:right-4 text-[7px] md:text-[9px] font-mono opacity-80 select-none ${isActive ? "text-black" : "text-kinetic-accent opacity-40"}`}>
                  [{link.code}]
                </span>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-glow"
                      className="absolute inset-0 bg-kinetic-accent"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center h-10 w-10 border border-kinetic-border bg-kinetic-bg text-kinetic-accent hover:bg-kinetic-accent hover:text-black transition-colors rounded-lg"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* HUD: Metadata / Time */}
        <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-kinetic-border/50">
          <div className="flex flex-col items-end">
            <span className="font-display text-[8px] font-bold text-kinetic-muted leading-tight uppercase tracking-widest">Local_Unit_Time</span>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-accent" />
              <span className="font-display text-[10px] font-black text-kinetic-fg tracking-widest">{time}</span>
            </div>
          </div>
          <div className="bg-kinetic-muted/20 p-2 border border-kinetic-border rounded-lg group hover:border-accent transition-colors">
            <Activity className="h-4 w-4 text-kinetic-accent group-hover:text-accent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-kinetic-bg/98 backdrop-blur-xl z-[90] flex flex-col pt-32 px-8 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="font-display text-[10px] font-bold text-kinetic-accent tracking-widest uppercase mb-4">Navigation_Menu</span>
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex items-center justify-between py-6 border-b border-kinetic-border"
                  >
                    <div className="flex flex-col">
                      <span className="font-display text-xs font-bold text-kinetic-accent mb-1">[{link.code}]</span>
                      <span className="font-display text-4xl font-black uppercase tracking-tighter group-hover:text-kinetic-accent transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <div className="h-10 w-10 border border-kinetic-border flex items-center justify-center group-hover:bg-kinetic-accent group-hover:text-black transition-colors rounded-full">
                      <Terminal size={18} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Footer Meta */}
            <div className="mt-auto pb-12 border-t border-kinetic-border pt-8 flex flex-col gap-4">
              <div className="flex items-center justify-between text-kinetic-muted">
                <span className="font-display text-[8px] font-bold tracking-widest uppercase">System_State: Stable</span>
                <span className="font-display text-[8px] font-bold tracking-widest uppercase">{time} [UTC]</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-kinetic-accent animate-pulse" />
                <span className="font-display text-[10px] font-black text-kinetic-fg tracking-tighter italic">DESIGNED_FOR_PERFORMANCE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Scanline inside navbar area */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kinetic-accent/20 to-transparent pointer-events-none" />
    </motion.nav>
  );
};

export default Navbar;
