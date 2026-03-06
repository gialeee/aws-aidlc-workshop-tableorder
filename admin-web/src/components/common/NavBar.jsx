import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function NavBar() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex gap-6">
        <Link to="/dashboard" className="hover:text-gray-300" data-testid="nav-dashboard">대시보드</Link>
        <Link to="/menus" className="hover:text-gray-300" data-testid="nav-menus">메뉴관리</Link>
      </div>
      <button onClick={handleLogout} className="hover:text-gray-300" data-testid="nav-logout">로그아웃</button>
    </nav>
  );
}
