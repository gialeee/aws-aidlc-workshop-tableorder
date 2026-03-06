import { useState, useEffect, useCallback } from 'react';

let toastId = 0;
let listeners = [];
const toasts = [];

function notify(message, type = 'success') {
  const id = ++toastId;
  toasts.push({ id, message, type });
  listeners.forEach((l) => l([...toasts]));
  setTimeout(() => {
    const idx = toasts.findIndex((t) => t.id === id);
    if (idx !== -1) toasts.splice(idx, 1);
    listeners.forEach((l) => l([...toasts]));
  }, 3000);
}

export function showToast(message, type) {
  notify(message, type);
}

export default function Toast() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listeners.push(setItems);
    return () => { listeners = listeners.filter((l) => l !== setItems); };
  }, []);

  if (!items.length) return null;

  return (
    <div style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((t) => (
        <div key={t.id} data-testid="toast" style={{
          padding: '12px 24px', borderRadius: 8, color: '#fff', fontSize: 14,
          background: t.type === 'error' ? '#e74c3c' : '#2ecc71',
        }}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
