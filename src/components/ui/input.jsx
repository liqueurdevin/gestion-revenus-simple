import React from 'react';
import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn("w-full p-2 border rounded", className)}
      {...props}
    />
  );
}
