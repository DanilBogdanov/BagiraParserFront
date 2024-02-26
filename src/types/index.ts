export enum AppPages {
  Prices = 'Цены',
  Competitors = 'Конкуренты',
  Pages = 'Страницы',
}

export interface GoodMenu {
  id: number;
  name: string;
  path: string;
  children: GoodMenu[] | null;
}

export interface BagiraGoodNameDto {
  id: number;
  name: string;
}
