import { GoodRequest } from '.';
import { ParserGood } from './competitors';

export interface GoodMenu {
  id: number;
  name: string;
  path: string;
  children: GoodMenu[] | null;
}

export interface BagiraGood {
  id: number;
  name: string;
  price: number;
  parserGoods: ParserGood[];
}

export interface BagiraGoodRequest extends GoodRequest {
  parentId: number | null;
}
