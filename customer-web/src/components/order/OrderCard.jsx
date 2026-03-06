import { Card, CardContent, Typography, Chip, Stack, Box, Divider } from '@mui/material';

const STATUS_MAP = {
  PENDING: { label: '대기중', color: 'warning' },
  PREPARING: { label: '준비중', color: 'info' },
  COMPLETED: { label: '완료', color: 'success' },
};

export default function OrderCard({ order }) {
  const status = STATUS_MAP[order.status] || { label: order.status, color: 'default' };

  return (
    <Card data-testid={`order-card-${order.id}`} sx={{ mb: 2 }} elevation={2}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" fontWeight={700}>{order.order_number}</Typography>
          <Chip label={status.label} color={status.color} size="small" />
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {new Date(order.created_at).toLocaleString('ko-KR')}
        </Typography>
        <Divider sx={{ my: 1 }} />
        {order.items.map((item) => (
          <Stack key={item.id} direction="row" justifyContent="space-between" py={0.3}>
            <Typography variant="body2">{item.menu_name} × {item.quantity}</Typography>
            <Typography variant="body2">{item.subtotal.toLocaleString()}원</Typography>
          </Stack>
        ))}
        <Divider sx={{ my: 1 }} />
        <Box textAlign="right">
          <Typography variant="subtitle1" fontWeight={800} color="primary">{order.total_amount.toLocaleString()}원</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
