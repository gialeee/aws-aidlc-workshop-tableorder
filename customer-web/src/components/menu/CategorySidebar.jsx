import { List, ListItemButton, ListItemText, Box } from '@mui/material';

export default function CategorySidebar({ categories, selectedId, onSelect }) {
  return (
    <Box data-testid="category-sidebar" sx={{
      width: 180, minHeight: '100%', bgcolor: '#fff', borderRight: '1px solid #eee', overflowY: 'auto', flexShrink: 0,
    }}>
      <List disablePadding>
        {categories.map((cat) => (
          <ListItemButton key={cat.id} selected={selectedId === cat.id} onClick={() => onSelect(cat.id)}
            data-testid={`category-${cat.id}`}
            sx={{
              py: 2,
              '&.Mui-selected': { bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } },
            }}>
            <ListItemText primary={cat.name} primaryTypographyProps={{ fontSize: 16, fontWeight: selectedId === cat.id ? 700 : 500, textAlign: 'center' }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
