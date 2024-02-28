import { GoodResponse } from '@/types';
import { BagiraGood, BagiraGoodRequest, GoodMenu } from '@/types/prices';
import axios from 'axios';

const BASE_URL = 'https://danildev.net';

export async function getGoodMenu(): Promise<GoodMenu[]> {
  const path = `${BASE_URL}/api/parser/v1/bagira/menu`;

  const { data: goodMenu } = await axios.get<GoodMenu[]>(path);

  return goodMenu;
}

export async function getBagiraGoods(
  bagiraGoodRequest: BagiraGoodRequest
): Promise<GoodResponse<BagiraGood>> {
  const path = `${BASE_URL}/api/parser/v1/bagira/goods`;

  const { data: bagiraGoods } = await axios.get<GoodResponse<BagiraGood>>(
    path,
    {
      params: bagiraGoodRequest,
    }
  );

  return bagiraGoods;
}
