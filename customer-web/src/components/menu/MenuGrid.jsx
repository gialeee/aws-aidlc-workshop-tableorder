import MenuCard from './MenuCard';

export default function MenuGrid({ menus, onAdd }) {
  return (
    <div data-testid="menu-grid" style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, padding: 16, flex: 1, overflowY: 'auto',
      alignContent: 'start',
    }}>
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} onAdd={onAdd} />
      ))}
      {menus.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#999', padding: 40 }}>메뉴가 없습니다</div>}
    </div>
  );
}
