"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  id,
  delay = 0,
  direction = "none",
}) => {
  const ref = useRef<HTMLElement>(null);
  // Reversible scroll trigger: once is set to false
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-5% 0px -5% 0px" });

  const getInitialProps = () => {
    switch (direction) {
      case "up": return { y: 60 };
      case "down": return { y: -60 };
      case "left": return { x: 60 };
      case "right": return { x: -60 };
      case "none": return {};
    }
  };

  const getAnimateProps = () => {
    switch (direction) {
      case "up": 
      case "down": return { y: 0 };
      case "left":
      case "right": return { x: 0 };
      case "none": return {};
    }
  };

  const windowVariants: Variants = {
    hidden: { 
      clipPath: "inset(0 100% 0 0)",
      scale: 0.95,
      opacity: 0,
      ...getInitialProps(),
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // quick exit
        staggerChildren: 0.05,
      }
    },
    visible: { 
      clipPath: "inset(0 0% 0 0)",
      scale: 1,
      opacity: 1,
      ...getAnimateProps(),
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // smooth entry
        delay: delay,
        staggerChildren: 0.1,
        delayChildren: delay + 0.3
      }
    }
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${className} min-h-[10px]`}
    >
      <motion.div
        variants={windowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};
