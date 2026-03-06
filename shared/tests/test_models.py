from shared.models import Store, Admin, TableInfo, TableSession, Category, Menu, Order, OrderItem, OrderHistory


def test_all_models_importable():
    models = [Store, Admin, TableInfo, TableSession, Category, Menu, Order, OrderItem, OrderHistory]
    assert len(models) == 9


def test_store_tablename():
    assert Store.__tablename__ == "stores"


def test_admin_tablename():
    assert Admin.__tablename__ == "admins"


def test_table_tablename():
    assert TableInfo.__tablename__ == "tables"


def test_order_tablename():
    assert Order.__tablename__ == "orders"


def test_order_item_tablename():
    assert OrderItem.__tablename__ == "order_items"


def test_order_history_tablename():
    assert OrderHistory.__tablename__ == "order_history"
