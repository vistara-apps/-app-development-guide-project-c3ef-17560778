
"use client";

import { cn } from "@/lib/utils";
import { type ChangeEvent } from "react";

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  disabled,
  required,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={cn("input-field w-full", className)}
      {...props}
    />
  );
}
