import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#ff6b35', contrastText: '#fff' },
    secondary: { main: '#004e89' },
    background: { default: '#fafafa' },
  },
  typography: {
    fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
  },
  shape: { borderRadius: 12 },
});

export default theme;
