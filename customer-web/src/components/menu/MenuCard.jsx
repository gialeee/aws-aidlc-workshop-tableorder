import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function MenuCard({ menu, onAdd }) {
  return (
    <Card data-testid={`menu-card-${menu.id}`} sx={{
      display: 'flex', flexDirection: 'column', transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-2px)' },
    }} elevation={2}>
      <CardMedia component="img" image={menu.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={menu.name} sx={{ aspectRatio: '3/2', objectFit: 'cover' }} />
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Typography variant="body1" fontWeight={700}>{menu.name}</Typography>
        {menu.description && (
          <Typography variant="body2" color="text.secondary" sx={{
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mt: 0.5,
          }}>{menu.description}</Typography>
        )}
        <Typography variant="subtitle1" color="primary" fontWeight={800} mt={1}>{menu.price.toLocaleString()}원</Typography>
      </CardContent>
      <Box px={2} pb={2}>
        <Button variant="contained" fullWidth size="small" startIcon={<AddShoppingCartIcon />}
          onClick={() => onAdd(menu)} data-testid={`menu-add-${menu.id}`}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
          담기
        </Button>
      </Box>
    </Card>
  );
}
