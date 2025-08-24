
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

const cardVariants = cva(
  "rounded-lg p-lg animate-fade-in",
  {
    variants: {
      variant: {
        default: "bg-surface border border-neutral-3/10 shadow-card",
        transparent: "bg-surface/50 backdrop-blur-sm border border-neutral-3/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  className,
  variant,
  children,
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, className }), onClick && "cursor-pointer hover:shadow-lg transition-shadow duration-200")}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
