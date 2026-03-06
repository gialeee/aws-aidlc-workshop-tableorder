import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

let listeners = [];
let queue = [];

export function showToast(message, type = 'success') {
  queue.push({ message, type, key: Date.now() });
  listeners.forEach((l) => l([...queue]));
  setTimeout(() => {
    queue = queue.filter((t) => t.key !== queue[0]?.key);
    listeners.forEach((l) => l([...queue]));
  }, 3000);
}

export default function Toast() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listeners.push(setItems);
    return () => { listeners = listeners.filter((l) => l !== setItems); };
  }, []);

  const current = items[0];
  if (!current) return null;

  return (
    <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'center' }} data-testid="toast">
      <Alert severity={current.type === 'error' ? 'error' : 'success'} variant="filled" sx={{ minWidth: 280 }}>
        {current.message}
      </Alert>
    </Snackbar>
  );
}
