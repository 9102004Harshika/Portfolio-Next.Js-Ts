"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  href,
  style,
  ...props
}) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "8px 16px", fontSize: 13 },
    md: { padding: "12px 24px", fontSize: 15 },
    lg: { padding: "14px 32px", fontSize: 16 },
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    fontWeight: 600,
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "none",
    outline: "none",
    ...sizeStyles[size],
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--color-accent)",
      color: "#FFFFFF",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-text-secondary)",
      border: "1px solid var(--color-border-subtle)",
    },
  };

  const combined = { ...baseStyle, ...variantStyles[variant] };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === "primary") {
      el.style.backgroundColor = "var(--color-accent-hover)";
      el.style.boxShadow = "0 0 24px rgba(124, 92, 255, 0.4)";
    } else {
      el.style.borderColor = "var(--color-accent)";
      el.style.color = "var(--color-text-primary)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === "primary") {
      el.style.backgroundColor = "var(--color-accent)";
      el.style.boxShadow = "none";
    } else {
      el.style.borderColor = "var(--color-border-subtle)";
      el.style.color = "var(--color-text-secondary)";
    }
  };

  if (href) {
    return (
      <a
        href={href}
        style={combined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={combined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
