import { Box, Typography, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <Box data-testid={`cart-item-${item.menu_id}`} sx={{ display: 'flex', alignItems: 'center', py: 1.5, borderBottom: '1px solid #f0f0f0', gap: 1.5 }}>
      <Box flex={1}>
        <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
        <Typography variant="caption" color="text.secondary">{item.price.toLocaleString()}원</Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton size="small" onClick={() => onUpdateQuantity(item.menu_id, item.quantity - 1)} data-testid={`cart-decrease-${item.menu_id}`}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>{item.quantity}</Typography>
        <IconButton size="small" onClick={() => onUpdateQuantity(item.menu_id, item.quantity + 1)} data-testid={`cart-increase-${item.menu_id}`}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Typography variant="body2" fontWeight={700} sx={{ minWidth: 65, textAlign: 'right' }}>
        {(item.price * item.quantity).toLocaleString()}원
      </Typography>
      <IconButton size="small" color="error" onClick={() => onRemove(item.menu_id)} data-testid={`cart-remove-${item.menu_id}`}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
