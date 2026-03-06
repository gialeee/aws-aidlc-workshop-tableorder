import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function ProtectedRoute({ children }) {
  const isAuth = useAuthStore((s) => s.isAuthenticated)();
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}
