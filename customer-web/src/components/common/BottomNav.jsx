import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.pathname === '/orders' ? 1 : 0;

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3} data-testid="bottom-nav">
      <BottomNavigation value={value} onChange={(_, v) => navigate(v === 0 ? '/menu' : '/orders')} showLabels>
        <BottomNavigationAction label="메뉴" icon={<RestaurantMenuIcon />} data-testid="nav-menu" />
        <BottomNavigationAction label="주문내역" icon={<ReceiptLongIcon />} data-testid="nav-orders" />
      </BottomNavigation>
    </Paper>
  );
}
