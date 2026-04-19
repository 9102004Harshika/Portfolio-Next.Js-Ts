"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OSLoaderProps {
  onLoadingComplete?: () => void;
}

const OSLoader: React.FC<OSLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<"PERMISSION" | "ACCESSING" | "BIOS" | "KERNEL" | "LOGIN" | "WELCOME" | "DONE">("PERMISSION");
  const [mounted, setMounted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [lastHoverTime, setLastHoverTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const accessingLogs = [
    "INITIALIZING SYSTEM OVERRIDE...",
    "BYPASSING SECURE FIREWALL...",
    "ESTABLISHING NEURAL LINK...",
    "INJECTING HANDSHAKE PROTOCOL...",
    "SCANNING LOCAL FILESYSTEM...",
    "GAINING ELEVATED PRIVILEGES...",
    "ACCESS GRANTED TO USER: ROOT",
    "LOADING PORTFOLIO CORE...",
  ];

  const biosLogs = [
    "AMIBIOS(C)2026 American Megatrends, Inc.",
    "CPU: Harshika Core(TM) i9-14900K @ 6.00GHz",
    "Speed: 6000MHz  Count: 24",
    "Memory Test: 65536MB OK",
    "PMU: Initialize... OK",
    "USB Device: 3 Keyboards, 2 Mice, 4 Hubs",
    "SATA Port1: ST1000LM048-2E7172 (1.0TB)",
    "SATA Port3: Samsung SSD 980 PRO 2TB (2.0TB)",
    "Boot Device Priority: [UEFI: HARSHIKA_OS_v1.0.4]",
  ];

  const kernelLogs = [
    "Uncompressing Linux... Ok, booting the kernel.",
    "Hardware name: Custom Portfolio Workstation",
    "Command line: root=/dev/sda1 ro quiet splash",
    "Initializing cgroup subsys cpuset",
    "Initializing cgroup subsys cpu",
    "Checking hypervisor composition...",
    "NET: Registered protocol family 2",
    "vgaarb: setting as boot device",
    "input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0",
    "ACPI: Core revision 20260331",
    "Thermal: CPU0 temp check: 32C",
    "Establishing Neural Overlay...",
    "Loading Kinetic Design Engine...",
    "Fetching Portfolio Modules...",
    "Optimizing UI Buffers...",
  ];

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "ACCESSING") {
      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < accessingLogs.length) {
          setLogs(prev => [...prev, accessingLogs[currentLog]]);
          currentLog++;
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase("BIOS"), 800);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "BIOS") {
      let currentLog = 0;
      const biosInterval = setInterval(() => {
        if (currentLog < biosLogs.length) {
          setLogs(prev => [...prev, biosLogs[currentLog]]);
          currentLog++;
        } else {
          clearInterval(biosInterval);
          setTimeout(() => {
            setPhase("KERNEL");
          }, 800);
        }
      }, 150);
      return () => clearInterval(biosInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "KERNEL") {
      let currentLog = 0;
      const kernelInterval = setInterval(() => {
        if (currentLog < kernelLogs.length) {
          setLogs(prev => [...prev, kernelLogs[currentLog]]);
          currentLog++;
          setProgress((currentLog / kernelLogs.length) * 100);
        } else {
          clearInterval(kernelInterval);
          setTimeout(() => {
            setPhase("LOGIN");
          }, 500);
        }
      }, 100);
      return () => clearInterval(kernelInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "LOGIN") {
      setTimeout(() => {
        setPhase("WELCOME");
      }, 1500);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "WELCOME") {
      const timer = setTimeout(() => {
        setPhase("DONE");
        setTimeout(() => {
          onLoadingComplete?.();
        }, 1200);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [phase, onLoadingComplete]);
  useEffect(() => {
    if (phase === "PERMISSION" && (noButtonPos.x !== 0 || noButtonPos.y !== 0)) {
      const timer = setInterval(() => {
        if (Date.now() - lastHoverTime > 3000) {
          setNoButtonPos({ x: 0, y: 0 });
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, [phase, lastHoverTime, noButtonPos]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {phase !== "DONE" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(60px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100000] bg-black text-kinetic-fg font-mono p-6 md:p-12 overflow-hidden flex flex-col"
          ref={containerRef}
        >
          {phase === "WELCOME" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
                <div className="w-[80vw] h-[80vw] border-[1px] border-kinetic-accent rounded-full animate-pulse" />
                <div className="absolute w-[60vw] h-[60vw] border-[1px] border-kinetic-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-[0.3em] text-white">
                  System Ready
                </h1>
                <div className="h-1 w-24 bg-kinetic-accent mx-auto" />
              </motion.div>
              
              <div className="space-y-8 max-w-4xl z-10">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-kinetic-accent p-6 md:p-10 text-black shadow-[0_0_50px_rgba(223,225,4,0.3)]"
                >
                  <p className="text-xl md:text-3xl font-bold uppercase tracking-widest leading-tight">
                    Your system will now work on Harshika Os
                  </p>
                </motion.div>
                
                <motion.p
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="text-lg md:text-xl text-kinetic-accent uppercase tracking-[0.4em] font-medium"
                >
                  You are successfully connected to Harshika os
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-20 text-[10px] uppercase tracking-[0.5em] text-kinetic-muted-foreground font-mono"
              >
                Neural Link Established... 100%
              </motion.div>
              
              {/* Scanning line */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-kinetic-accent/20 shadow-[0_0_15px_rgba(223,225,4,0.4)] z-20 pointer-events-none"
              />
            </motion.div>
          ) : phase === "PERMISSION" ? (
            <div className="flex-1 flex items-center justify-center relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-2xl w-full bg-black border-2 border-kinetic-accent p-12 relative shadow-[0_0_50px_rgba(223,225,4,0.2)]"
              >
                {/* Header */}
                <div className="absolute -top-4 left-6 bg-black px-4 text-kinetic-accent text-xs tracking-widest uppercase font-bold">
                  Security Alert
                </div>

                <div className="space-y-10 py-4">
                  <div className="text-kinetic-accent text-4xl flex justify-center mb-4">
                    <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  
                  <div className="text-center space-y-4 px-16">
                    <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">System Access Request</h2>
                    <p className="text-xs text-kinetic-muted-foreground leading-relaxed px-6">
                      This terminal is requesting permission to interface with your local hardware and neural pathways. 
                      Proceed with authorization?
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6 relative min-h-[80px]">
                    <button
                      onClick={() => setPhase("ACCESSING")}
                      className="w-full sm:w-auto px-12 py-4 bg-kinetic-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                    >
                      Grant Access
                    </button>
                    
                    <motion.button
                      animate={{ 
                        x: noButtonPos.x, 
                        y: noButtonPos.y,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      onMouseEnter={() => {
                        if (typeof window === 'undefined') return;
                        
                        const winW = window.innerWidth;
                        const winH = window.innerHeight;
                        
                        const padding = 120;
                        const maxOffsetX = (winW / 2) - padding;
                        const maxOffsetY = (winH / 2) - padding;
                        
                        // We want to avoid a "dead zone" around the modal (approx 600x600 to clear borders)
                        const deadZoneX = 350; 
                        const deadZoneY = 250;

                        let newX, newY;
                        let attempts = 0;
                        
                        do {
                          newX = (Math.random() - 0.5) * winW * 0.85;
                          newY = (Math.random() - 0.5) * winH * 0.85;
                          
                          newX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newX));
                          newY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newY));
                          attempts++;
                        } while (
                          Math.abs(newX) < deadZoneX && 
                          Math.abs(newY) < deadZoneY && 
                          attempts < 10
                        );

                        // If it's still in the dead zone, push it to a corner
                        if (Math.abs(newX) < deadZoneX && Math.abs(newY) < deadZoneY) {
                          newX = newX > 0 ? deadZoneX + 50 : -deadZoneX - 50;
                          newY = newY > 0 ? deadZoneY + 50 : -deadZoneY - 50;
                        }

                        setNoButtonPos({ x: newX, y: newY });
                        setLastHoverTime(Date.now());
                      }}
                      className="w-full sm:w-auto px-12 py-4 border-2 border-kinetic-muted-foreground/20 text-kinetic-muted-foreground uppercase tracking-widest cursor-not-allowed z-[1000] bg-black/50 backdrop-blur-sm"
                    >
                      Deny
                    </motion.button>
                  </div>

                  <div className="text-[10px] text-center opacity-30 mt-12 uppercase tracking-[0.3em]">
                    (Experience only. No real data will be accessed.)
                  </div>
                </div>
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-kinetic-accent" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-kinetic-accent" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-kinetic-accent" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-kinetic-accent" />
              </motion.div>
            </div>
          ) : (
            <>
              {/* Top Bar Info (BIOS Style) */}
              <div className="flex justify-between text-[10px] md:text-xs text-kinetic-muted-foreground border-b border-kinetic-border pb-4 mb-6">
                <div>HARSHIKA_v1.0.4_OS_KERNEL_INIT</div>
                <div suppressHydrationWarning>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
              </div>

              <div className="flex-1 overflow-hidden relative">
                <div className="h-full overflow-y-auto scrollbar-hide space-y-1">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.05 }}
                      className={`text-[10px] md:text-sm ${
                        log && (log.startsWith("CPU") || log.startsWith("Memory") || log.includes("GRANTED")) ? "text-kinetic-accent" : ""
                      }`}
                    >
                      <span className="opacity-30 mr-3">[{i.toString().padStart(3, '0')}]</span>
                      {log}
                    </motion.div>
                  ))}
                  
                  {phase === "LOGIN" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8 p-6 border border-kinetic-accent/30 bg-kinetic-accent/5 max-w-sm mx-auto text-center"
                    >
                      <div className="text-xs uppercase tracking-[0.3em] mb-4 text-kinetic-accent">Authenticating User</div>
                      <div className="text-xl font-bold mb-2">ROOT@HARSHIKA_OS</div>
                      <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="w-full h-1 bg-kinetic-accent mt-4"
                      />
                      <div className="text-[10px] mt-2 opacity-50 uppercase tracking-widest">Access Granted</div>
                    </motion.div>
                  )}

                  <div className="h-20" /> {/* Spacer */}
                </div>

                {/* Bottom Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm pt-6 pb-2">
                  <div className="flex justify-between text-[8px] uppercase tracking-[0.2em] mb-2 opacity-50">
                    <span>Core Initialization</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 w-full bg-kinetic-border/30 relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-kinetic-accent shadow-[0_0_15px_rgba(223,225,4,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CRT Overlay on top of loader */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            <motion.div
              animate={{ opacity: [0.1, 0.15, 0.1] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute inset-0 bg-white/5"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OSLoader;
