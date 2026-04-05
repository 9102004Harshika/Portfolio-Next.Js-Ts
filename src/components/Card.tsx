"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  onClick,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      onClick={onClick}
      className={className}
      style={{
        backgroundColor: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: 12,
        padding: 24,
        cursor: onClick ? "pointer" : "default",
        transition:
          "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        ...style,
      }}
      whileHover={
        onClick
          ? {
              y: -4,
              borderColor: "var(--color-accent)",
              boxShadow: "0 0 16px rgba(124, 92, 255, 0.2)",
            }
          : {
              y: -4,
              borderColor: "var(--color-accent)",
              boxShadow: "0 0 16px rgba(124, 92, 255, 0.2)",
            }
      }
    >
      {children}
    </motion.div>
  );
};

export default Card;
