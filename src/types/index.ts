export enum AppPages {
  Prices = 'Цены',
  Competitors = 'Конкуренты',
  Pages = 'Страницы',
}

export interface GoodResponse<T> {
  take: number;
  skip: number;
  total: number;
  result: T[];
}
