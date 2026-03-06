import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, AppBar, Toolbar } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { fetchOrders } from '../services/orderService';
import OrderCard from '../components/order/OrderCard';
import BottomNav from '../components/common/BottomNav';
import { showToast } from '../components/common/Toast';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((e) => showToast(e.message, 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="sticky" elevation={1} sx={{ background: '#fff', color: '#333' }}>
        <Toolbar>
          <ReceiptLongIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700}>주문 내역</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pb: '72px' }}>
        {loading && <Box textAlign="center" py={8}><CircularProgress /></Box>}
        {!loading && orders.length === 0 && <Box textAlign="center" py={8}><Typography color="text.secondary">주문 내역이 없습니다</Typography></Box>}
        {orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </Box>
      <BottomNav />
    </Box>
  );
}
