import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const [storeId, setStoreId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(Number(storeId), username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || '로그인 실패');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
        {error && <p className="text-red-500 text-sm mb-4" data-testid="login-error">{error}</p>}
        <input type="number" placeholder="매장 ID" value={storeId} onChange={(e) => setStoreId(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3" data-testid="login-store-id" required />
        <input type="text" placeholder="사용자명" value={username} onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3" data-testid="login-username" required />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4" data-testid="login-password" required />
        <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700" data-testid="login-submit">
          로그인
        </button>
      </form>
    </div>
  );
}
