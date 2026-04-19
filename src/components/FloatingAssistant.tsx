"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronRight, Monitor, Cpu, Radio } from "lucide-react";

interface HistoryItem {
  type: "command" | "response";
  content: string | React.ReactNode;
}

const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "response", content: "Harshika-OS v1.0.4 - Initializing connection..." },
    { type: "response", content: "ESTABLISHING SECURE TUNNEL... [OK]" },
    { type: "response", content: "Welcome, Guest. Type 'help' to see available commands." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newHistory: HistoryItem[] = [...history, { type: "command", content: cmd }];

    switch (command) {
      case "help":
        newHistory.push({
          type: "response",
          content: (
            <div className="flex flex-col gap-1 text-kinetic-accent">
              <span>- ls: List available modules</span>
              <span>- whoami: Identity display</span>
              <span>- cat about: Show bio</span>
              <span>- cat contact: Show contact info</span>
              <span>- clear: Reset terminal buffer</span>
              <span>- exit: Terminate session</span>
              <span>- neofetch: System summary</span>
            </div>
          ),
        });
        break;
      case "ls":
        newHistory.push({ type: "response", content: "about.md  projects.sh  skills.bin  contact.txt" });
        break;
      case "whoami":
        newHistory.push({ type: "response", content: "Harshika | Full-Stack Developer & Creative Technologist" });
        break;
      case "cat about":
        newHistory.push({ type: "response", content: "A developer focused on building high-performance applications with clean architectures and memorable user experiences. Specialist in Next.js, React, and Node.js." });
        break;
      case "cat contact":
        newHistory.push({ type: "response", content: "Email: hello@harshika.dev | Github: @9102004Harshika" });
        break;
      case "neofetch":
        newHistory.push({
          type: "response",
          content: (
            <div className="flex gap-4">
              <div className="text-kinetic-accent font-bold">
                <pre>{`  ____
 |  _ \\
 | |_) |
 |  _ <
 |_| \\_\\`}</pre>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-kinetic-accent font-bold">harshika@portfolio</span>
                <span>--------------</span>
                <span>OS: Harshika-OS v1.0.4</span>
                <span>Kernel: 2.0.26-x86_64</span>
                <span>Uptime: 24 days, 7 hours</span>
                <span>Shell: harsh-sh 5.1</span>
                <span>Resolution: 1920x1080</span>
                <span>DE: Kinetic-Interface</span>
              </div>
            </div>
          ),
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        setIsOpen(false);
        break;
      case "":
        break;
      default:
        newHistory.push({ type: "response", content: `Command not found: ${command}. Type 'help' for options.` });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 150 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="terminal-window fixed inset-0 z-[1000] flex flex-col overflow-hidden border-none shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="terminal-header flex items-center justify-between px-6 py-4 bg-kinetic-muted/90 border-b border-kinetic-border">
              <div className="flex items-center gap-4">
                <Terminal size={18} className="text-kinetic-accent" />
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-kinetic-fg uppercase flex items-center gap-3">
                  SYSTEM_TERMINAL // SESSION_ACTIVE
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kinetic-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-kinetic-accent"></span>
                  </span>
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-kinetic-muted-foreground hover:text-kinetic-accent transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Terminal Content */}
            <div 
              ref={scrollRef}
              className="flex-1 p-8 md:p-12 font-mono text-base md:text-lg overflow-y-auto scrollbar-hide flex flex-col gap-4 bg-black/90 relative"
            >
              <div className="flex items-center gap-6 mb-8 pb-4 border-b border-kinetic-border/30 opacity-60">
                <div className="flex items-center gap-2">
                  <Monitor size={14} className="text-kinetic-accent" />
                  <span className="text-xs uppercase tracking-widest">TTY_CONSOLE_01</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-kinetic-accent" />
                  <span className="text-xs uppercase tracking-widest">CPU_LOAD: 0.04 [STABLE]</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Radio size={14} className="text-kinetic-accent" />
                  <span className="text-xs uppercase tracking-widest text-kinetic-accent animate-pulse">UPLINK_STABLE</span>
                </div>
              </div>

              {history.map((item, idx) => (
                <div key={idx} className={item.type === "command" ? "text-white" : "text-kinetic-fg/90"}>
                  {item.type === "command" ? (
                    <div className="flex items-center gap-2 whitespace-pre-wrap">
                      <span className="text-kinetic-accent">harshika@portfolio:~$</span>
                      <span className="terminal-text">{item.content}</span>
                    </div>
                  ) : (
                    <div className="terminal-text whitespace-pre-wrap pl-2 border-l border-kinetic-accent/20">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}

              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
                <span className="text-kinetic-accent">harshika@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white terminal-text caret-kinetic-accent"
                  autoFocus
                  spellCheck={false}
                />
                <ChevronRight size={14} className="text-kinetic-accent animate-pulse" />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-kinetic-accent flex items-center justify-center text-black shadow-[0_0_20px_rgba(223,225,4,0.4)] border-2 border-black/10 z-[200] relative"
      >
        {isOpen ? <X size={24} /> : <Terminal size={24} />}
        {!isOpen && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
             <span className="relative inline-flex rounded-full h-4 w-4 bg-white border border-black/10"></span>
           </span>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingAssistant;
