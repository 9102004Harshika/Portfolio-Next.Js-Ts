"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import KineticButton from "@/components/KineticButton";
import { ArrowRight } from "lucide-react";
import { TextDecrypt } from "@/components/animations/TextDecrypt";
import { SectionWrapper } from "@/components/animations/SectionWrapper";

const Landing: React.FC = () => {
  const [logs, setLogs] = useState<{ id: string; node: number; port: number }[]>([]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const newLogs = Array(20).fill(0).map(() => ({
      id: Math.random().toString(36).substring(7).toUpperCase(),
      node: Math.floor(Math.random() * 100),
      port: Math.floor(Math.random() * 65535),
    }));
    setLogs(newLogs);
  }, []);

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <SectionWrapper 
      id="landing" 
      className="min-h-[90vh] flex flex-col justify-center"
      delay={0.1}
    >
      {/* Background System Logs Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] select-none font-mono text-[10px] p-10 overflow-hidden break-all leading-tight" suppressHydrationWarning={true}>
        {logs.map((log, i) => (
          <p key={i} className="mb-2">
            [SYS_INIT_{log.id}] KERNEL_LOAD_MODULE_{i} ... OK <br />
            [STRATEGY_INIT] FETCHING_ASSET_DATA_FROM_CLOUD_NODE_{log.node} ... SUCCESS <br />
            [NETWORK_STATE] LINK_ESTABLISHED_PORT_{log.port}_STABLE
          </p>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Massive Typography */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-kinetic-accent">
                  <TextDecrypt text="[MODULE_ID: 0x01_CORE_IDENTITY]" delay={0.3} />
                </span>
                <span className="font-display text-sm md:text-base font-bold uppercase tracking-widest text-kinetic-accent ml-auto">
                  <TextDecrypt text="Full Stack Developer" delay={0.6} />
                </span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,8vw,7.5rem)] font-bold uppercase tracking-tighter leading-[0.85] lg:leading-none mix-blend-difference" suppressHydrationWarning={true}>
                <TextDecrypt text="HARSHIKA GAWADE." duration={2} delay={0.8} />
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 1.2 }}
              className="font-sans text-2xl md:text-4xl text-kinetic-muted-foreground max-w-2xl leading-tight"
            >
              Building high-performance applications with clean architectures and memorable user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 1.4 }}
              className="flex flex-wrap gap-6"
            >
              <KineticButton variant="primary" size="lg" onClick={() => window.location.hash = "#projects"} className="w-full sm:w-auto">
                CONNECT_TO_MODULES [PROJECTS] <ArrowRight className="ml-4 h-6 w-6" />
              </KineticButton>
              <KineticButton variant="outline" size="lg" onClick={() => window.location.hash = "#contact"} className="w-full sm:w-auto">
                INIT_UPLINK [CONTACT]
              </KineticButton>
            </motion.div>
          </div>

          {/* Right Side: Dynamic Character Frame */}
          <div className="lg:col-span-4 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] order-first lg:order-last lg:-translate-x-12">
            {/* Frame */}
            <motion.div
              style={{ y: yParallax }}
              variants={{
                hidden: { opacity: 0, rotate: -12, scale: 0.8 },
                visible: { 
                  opacity: 0.2, 
                  rotate: -12, 
                  scale: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.5
                  }
                }
              }}
              className="absolute top-10 left-0 w-full aspect-square border-2 border-kinetic-accent z-0 shadow-[0_0_50px_rgba(223,225,4,0.1)]"
            />

            {/* Image Container with Reveal Animation */}
            <motion.div
              style={{ y: yParallax }}
              variants={{
                hidden: { 
                  opacity: 0, 
                  clipPath: "inset(100% 0 0 0)",
                  scale: 1.05,
                },
                visible: { 
                  opacity: 1, 
                  clipPath: "inset(0% 0 0 0)",
                  scale: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.5,
                  }
                }
              }}
              className="relative z-10 w-full h-full"
            >
              <Image
                src="/assets/harshika_themed.png"
                alt="Harshika Gawade - Full Stack Developer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                className="object-contain filter contrast-110 brightness-110"
                priority
              />
              
              {/* Optional: Digital scanline overlay during reveal */}
              <motion.div 
                variants={{
                  hidden: { top: "0%", opacity: 0 },
                  visible: { 
                    top: "100%", 
                    opacity: [0, 1, 0],
                    transition: { 
                      duration: 1.2, 
                      delay: 0.5, 
                      ease: "linear" 
                    }
                  }
                }}
                className="absolute left-0 w-full h-1 bg-kinetic-accent/30 z-20 pointer-events-none blur-[2px]"
              />
            </motion.div>

            {/* Background Decorative Numbers */}
            <div className="absolute -bottom-10 -right-10 lg:-bottom-20 lg:-right-20 select-none pointer-events-none opacity-10">
              <span className="font-display text-[10rem] lg:text-[20rem] font-bold text-kinetic-muted leading-none">
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
        suppressHydrationWarning={true}
      >
        <span className="font-display text-xs uppercase tracking-widest text-kinetic-muted-foreground">System_Scroll</span>
        <div className="w-px h-12 bg-kinetic-border shadow-[0_0_8px_rgba(255,255,255,0.2)]" suppressHydrationWarning={true} />
      </motion.div>
    </SectionWrapper>
  );
};

export default Landing;
