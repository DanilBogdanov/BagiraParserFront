import { GoodMenu } from '@/types';
import axios from 'axios';

const BASE_URL = 'https://danildev.net';

export async function getGoodMenu(): Promise<GoodMenu[]> {
  const path = `${BASE_URL}/api/parser/v1/bagira/menu`;

  const { data: goodMenu } = await axios.get<GoodMenu[]>(path);

  return goodMenu;
}
