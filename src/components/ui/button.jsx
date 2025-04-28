import React from 'react';
import { cn } from "@/lib/utils";

export function Button({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
