import React from 'react';
import { cn } from "@/lib/utils";

export function Toast({ title, description, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-gray-800 text-white p-4 rounded-lg shadow-lg",
        className
      )}
      {...props}
    >
      <h4 className="font-bold">{title}</h4>
      <p>{description}</p>
    </div>
  );
}
