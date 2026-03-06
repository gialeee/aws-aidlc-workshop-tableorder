import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

function useElapsed(startedAt) {
  const [elapsed, setElapsed] = useState('00:00:00');
  useEffect(() => {
    if (!startedAt) return;
    const calc = () => {
      const diff = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setElapsed(`${h}:${m}:${s}`);
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  return elapsed;
}

export default function Header({ totalCount, onCartClick }) {
  const { logout, startedAt } = useAuthStore();
  const navigate = useNavigate();
  const elapsed = useElapsed(startedAt);

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };

  return (
    <AppBar position="sticky" elevation={1} sx={{ background: '#fff', color: '#333' }}>
      <Toolbar>
        <RestaurantMenuIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>테이블 오더</Typography>
        <Chip icon={<AccessTimeIcon />} label={elapsed} size="small" variant="outlined" sx={{ mr: 1, fontWeight: 600 }} />
        <IconButton onClick={onCartClick} data-testid="header-cart-button">
          <Badge badgeContent={totalCount} color="primary"><ShoppingCartIcon /></Badge>
        </IconButton>
        <IconButton onClick={handleLogout} data-testid="header-logout-button" sx={{ ml: 1 }}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
