import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const base = { flex: 1, textAlign: 'center', padding: '12px 0', textDecoration: 'none', color: '#888', fontSize: 14 };
  const active = { ...base, color: '#2ecc71', fontWeight: 'bold' };

  return (
    <nav data-testid="bottom-nav" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex',
      background: '#fff', borderTop: '1px solid #eee', zIndex: 100,
    }}>
      <NavLink to="/menu" style={({ isActive }) => isActive ? active : base} data-testid="nav-menu">
        🍽️ 메뉴
      </NavLink>
      <NavLink to="/orders" style={({ isActive }) => isActive ? active : base} data-testid="nav-orders">
        📋 주문내역
      </NavLink>
    </nav>
  );
}
