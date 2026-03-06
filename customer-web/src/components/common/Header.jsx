import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

export default function Header({ totalCount, onCartClick }) {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="sticky" elevation={1} sx={{ background: '#fff', color: '#333' }}>
      <Toolbar>
        <RestaurantMenuIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>테이블 오더</Typography>
        <IconButton onClick={onCartClick} data-testid="header-cart-button">
          <Badge badgeContent={totalCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleLogout} data-testid="header-logout-button" sx={{ ml: 1 }}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
