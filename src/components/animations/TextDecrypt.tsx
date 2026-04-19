"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextDecryptProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  revealDuration?: number;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";

export const TextDecrypt: React.FC<TextDecryptProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 1.5,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef(null);
  // Re-triggering text decryption on each view entry
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) {
      // Optional: reset to random chars or original text when out of view
      // We reset it here so the animation restarts correctly on re-entry
      setDisplayText(text.split("").map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join(""));
      return;
    };

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const startAnimation = () => {
      let iteration = 0;
      const originalText = text;
      
      intervalId = setInterval(() => {
        setDisplayText((prev) =>
          originalText
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );

        if (iteration >= originalText.length) {
          clearInterval(intervalId);
        }

        iteration += 1 / (duration / (1000 / 60)); // frames per second approximation
      }, 30);
    };

    timeoutId = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, duration, isInView]);

  return (
    <motion.span
      ref={containerRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};
