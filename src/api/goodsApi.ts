import { GoodMenu } from '@/types';
import { MenuProps } from 'antd';
import axios from 'axios';

const BASE_URL = 'https://danildev.net';

export async function getGoodMenu(): Promise<MenuProps['items']> {
  const path = `${BASE_URL}/api/bagira/v1/Menu`;

  const { data } = await axios.get<GoodMenu[]>(path);
  const menuProps = getMenuProps(data);

  return menuProps;
}

const getMenuProps = (
  goodMenu: GoodMenu[],
  level: number = 0
): MenuProps['items'] => {
  return goodMenu.map((item) => ({
    ...item,
    key: item.id,
    label: item.name,
    children:
      item.children && level < 1
        ? getMenuProps(item.children, level + 1)
        : null,
  }));
};
