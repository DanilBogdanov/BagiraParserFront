export enum AppPages {
  Prices = 'Цены',
  Competitors = 'Конкуренты',
  Pages = 'Страницы',
}

export interface GoodMenu {
  id: number;
  name: string;
  children: GoodMenu[] | null;
}

export interface GoodMenuItem {
  id: number;
  name: string;
  path: string;
  key: string;
  label: string;
  children: GoodMenuItem[] | null;
}

export interface BagiraGoodNameDto {
  id: number;
  name: string;
}
