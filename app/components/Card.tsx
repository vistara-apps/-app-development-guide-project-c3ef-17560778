"use client";

import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "transparent";
  className?: string;
}

export function Card({ children, variant = "default", className = "" }: CardProps) {
  const baseClasses = "rounded-lg transition-all duration-base ease-smooth";
  
  const variantClasses = {
    default: "card",
    transparent: "bg-transparent border-0 p-0 shadow-none",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
