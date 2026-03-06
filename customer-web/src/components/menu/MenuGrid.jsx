import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuCard from './MenuCard';

export default function MenuGrid({ menus, onAdd }) {
  return (
    <Box data-testid="menu-grid" sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
      {menus.length === 0 ? (
        <Box textAlign="center" py={8}><Typography color="text.secondary">메뉴가 없습니다</Typography></Box>
      ) : (
        <Grid container spacing={2}>
          {menus.map((menu) => (
            <Grid item xs={4} key={menu.id}>
              <MenuCard menu={menu} onAdd={onAdd} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
