import React from 'react';
import { Toast } from './toast';

export function Toaster() {
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      <Toast />
    </div>
  );
}
