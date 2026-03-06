import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>로딩 중...</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <form onSubmit={handleSubmit} data-testid="login-form" style={{
        background: '#fff', padding: 32, borderRadius: 12, width: 320, boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>🍽️ 테이블 오더</h2>
        {error && <div data-testid="login-error" style={{ color: '#e74c3c', marginBottom: 12, fontSize: 14 }}>{error}</div>}
        <input data-testid="login-store-code" placeholder="매장 코드" value={storeCode} onChange={(e) => setStoreCode(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input data-testid="login-table-number" placeholder="테이블 번호" type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input data-testid="login-password" placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <button data-testid="login-submit" type="submit" style={{
          width: '100%', padding: 14, background: '#2ecc71', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer',
        }}>로그인</button>
      </form>
    </div>
  );
}
