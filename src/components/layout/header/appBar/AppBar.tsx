import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AppRoutes } from '@/router/routes';

const items = [
  { key: AppRoutes.Prices, label: <Link to={AppRoutes.Prices}>Цены</Link> },
  {
    key: AppRoutes.Competitors,
    label: <Link to={AppRoutes.Competitors}>Конкуренты</Link>,
  },
  { key: AppRoutes.Pages, label: <Link to={AppRoutes.Pages}>Страницы</Link> },
];

const getSelectedKeys = (): string[] => {
  const key = items.find((item) => location.pathname.startsWith(item.key))?.key;

  return key ? [key] : [];
};

export default function AppBar() {
  return (
    <>
      <Menu
        mode='horizontal'
        style={{ width: '100%', justifyContent: 'center' }}
        items={items}
        defaultSelectedKeys={getSelectedKeys()}
      />
    </>
  );
}
