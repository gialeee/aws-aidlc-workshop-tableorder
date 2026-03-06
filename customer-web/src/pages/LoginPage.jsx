import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import useAuthStore from '../stores/authStore';

export default function LoginPage() {
  const [storeCode, setStoreCode] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { login, autoLogin, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) { navigate('/menu', { replace: true }); return; }
    autoLogin().then((ok) => { if (ok) navigate('/menu', { replace: true }); }).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(storeCode, Number(tableNumber), password);
      navigate('/menu', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"
      sx={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
      <Card sx={{ width: 380, mx: 2 }} elevation={8}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={3}>
            <RestaurantIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h5" fontWeight={700}>테이블 오더</Typography>
            <Typography variant="body2" color="text.secondary">매장 정보를 입력해주세요</Typography>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }} data-testid="login-error">{error}</Alert>}
          <form onSubmit={handleSubmit} data-testid="login-form">
            <TextField fullWidth label="매장 코드" value={storeCode} onChange={(e) => setStoreCode(e.target.value)}
              sx={{ mb: 2 }} inputProps={{ 'data-testid': 'login-store-code' }} />
            <TextField fullWidth label="테이블 번호" value={tableNumber} onChange={(e) => setTableNumber(e.target.value.replace(/\D/g, ''))}
              sx={{ mb: 2 }} inputProps={{ 'data-testid': 'login-table-number', inputMode: 'numeric', pattern: '[0-9]*' }} />
            <TextField fullWidth label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }} inputProps={{ 'data-testid': 'login-password' }} />
            <Button fullWidth variant="contained" size="large" type="submit" data-testid="login-submit"
              sx={{ py: 1.5, fontSize: 16, fontWeight: 600 }}>
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
