import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  return (
    <div className={`fixed top-4 right-4 ${bg} text-white px-6 py-3 rounded shadow-lg z-50`} data-testid="toast">
      {message}
    </div>
  );
}
