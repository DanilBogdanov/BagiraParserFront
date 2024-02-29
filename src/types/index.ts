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

export interface GoodRequest {
  take?: number;
  skip?: number;
}

export enum QueryKeys {
  ParserCompanies = 'parser-companies',
  ParserBrands = 'parser-brands',
  ParserGoods = 'parser-goods',
  BagiraGoods = 'bagira-goods',
  BagiraMenu = 'bagira-menu',
  BagiraGoodNames = 'bagira-good-names',
  ParserPages = 'parser-pages',
}
