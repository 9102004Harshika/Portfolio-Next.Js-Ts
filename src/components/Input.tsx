"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  textarea?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  textarea = false,
  rows = 5,
  id,
  style,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "var(--color-bg-secondary)",
    border: "1px solid var(--color-border-subtle)",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 15,
    fontFamily: "var(--font-sans)",
    color: "var(--color-text-primary)",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    resize: textarea ? "vertical" : undefined,
    ...style,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-accent)";
    e.currentTarget.style.boxShadow = "0 0 12px rgba(124, 92, 255, 0.2)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-border-subtle)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--color-text-secondary)",
          }}
        >
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          id={inputId}
          rows={rows}
          style={sharedStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={inputId}
          style={sharedStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};

export default Input;
