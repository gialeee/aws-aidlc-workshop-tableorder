import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, Typography, IconButton, Button, Divider, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useCartStore from '../../stores/cartStore';
import { createOrder } from '../../services/orderService';
import { showToast } from '../common/Toast';
import CartItem from './CartItem';

export default function CartDrawer({ isOpen, onClose }) {
  const { getItems, getTotalPrice, getTotalCount, updateQuantity, removeItem, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const items = getItems();

  const handleOrder = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const order = await createOrder(items.map((i) => ({ menu_id: i.menu_id, quantity: i.quantity })));
      clearCart();
      onClose();
      showToast(`주문 완료! (${order.order_number})`);
      navigate('/menu', { replace: true });
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} data-testid="cart-drawer"
      PaperProps={{ sx: { width: 360, display: 'flex', flexDirection: 'column' } }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={700}>🛒 장바구니</Typography>
        <IconButton onClick={onClose} data-testid="cart-close"><CloseIcon /></IconButton>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {items.length === 0
          ? <Box textAlign="center" py={8}><Typography color="text.secondary">장바구니가 비어있습니다</Typography></Box>
          : items.map((item) => <CartItem key={item.menu_id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />)}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={700}>총 {getTotalCount()}개</Typography>
          <Typography variant="h6" fontWeight={700} color="primary">{getTotalPrice().toLocaleString()}원</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={clearCart} data-testid="cart-clear"
            sx={{ flex: 1, textTransform: 'none' }}>비우기</Button>
          <Button variant="contained" onClick={handleOrder} disabled={items.length === 0 || loading} data-testid="cart-order"
            sx={{ flex: 2, textTransform: 'none', fontWeight: 700, py: 1.2 }}>
            {loading ? '주문 중...' : '주문하기'}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
