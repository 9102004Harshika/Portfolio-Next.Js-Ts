"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "INFO" | "WARN" | "ERR" | "SYS";
  message: string;
}

export const SystemLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: LogEntry["type"] = "INFO") => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      message,
    };
    setLogs((prev) => [...prev.slice(-49), newLog]);
  };

  useEffect(() => {
    setMounted(true);
    const initialLogs = [
      { message: "Initializing System Terminal...", type: "SYS" as const },
      { message: "Kernel: Harshika-OS v1.0.4 x64", type: "INFO" as const },
      { message: "Network: Uplink established on port 443", type: "INFO" as const },
      { message: "Graphics: CRT Overlay initialized", type: "SYS" as const },
    ];

    initialLogs.forEach((log, i) => {
      setTimeout(() => addLog(log.message, log.type), i * 500);
    });

    const interval = setInterval(() => {
      const messages = [
        "Scanning creative nodes...",
        "Optimizing layout buffer...",
        "Checking neural overlay status...",
        "Syncing portfolio modules...",
        "User session active: ID_ROOT",
        "Cache cleared: static_assets",
        "Heartbeat peak: 60fps stable",
      ];
      addLog(messages[Math.floor(Math.random() * messages.length)], "SYS");
    }, 15000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!mounted || !isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      drag
      dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
      className="fixed bottom-6 right-6 z-[10000] w-80 md:w-96 font-mono pointer-events-auto"
    >
      <div className="border border-kinetic-border bg-black/90 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-kinetic-border/20 px-3 py-2 border-b border-kinetic-border select-none cursor-move">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-kinetic-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-kinetic-fg">System Console</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-kinetic-accent transition-colors">
              {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
            </button>
            <button onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "16rem" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div 
                ref={scrollRef}
                className="p-3 h-full overflow-y-auto scrollbar-hide text-[10px] space-y-1"
              >
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-2">
                    <span className="text-kinetic-muted-foreground opacity-50 shrink-0">[{log.timestamp}]</span>
                    <span className={`shrink-0 ${
                      log.type === "ERR" ? "text-red-500" : 
                      log.type === "WARN" ? "text-yellow-500" : 
                      log.type === "SYS" ? "text-kinetic-accent" : 
                      "text-kinetic-fg"
                    }`}>[{log.type}]</span>
                    <span className="text-kinetic-fg/90">{log.message}</span>
                  </div>
                ))}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1.5 h-3 bg-kinetic-accent inline-block"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
