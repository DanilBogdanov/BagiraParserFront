import { GoodMenu, GoodMenuItem, BagiraGoodNameDto } from '@/types';
import axios from 'axios';

const BASE_URL = 'https://danildev.net';

export async function getGoodMenu(): Promise<GoodMenuItem[]> {
  const path = `${BASE_URL}/api/bagira/v1/Menu`;

  const { data } = await axios.get<GoodMenu[]>(path);
  const menuProps = getMenuProps(data);

  return menuProps;
}

export async function getBagiraGoodNames(): Promise<BagiraGoodNameDto[]> {
  const path = `${BASE_URL}/api/parser/v1/bagira/goods/names`;

  const { data } = await axios.get<BagiraGoodNameDto[]>(path);

  return data;
}

const getMenuProps = (
  goodMenu: GoodMenu[],
  level: number = 0,
  path: string = ''
): GoodMenuItem[] => {
  return goodMenu.map((item) => ({
    ...item,
    key: item.id.toString(),
    label: item.name,
    path,
    children:
      item.children && level < 2
        ? getMenuProps(item.children, level + 1, `${path}/${item.id}`)
        : null,
  }));
};
