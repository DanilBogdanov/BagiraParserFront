export enum AppPages {
  Prices,
  Competitors,
  Pages,
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

export interface ParserCompany {
  id: number;
  name: string;
}

export interface ParserPage {
  id: number;
  parserCompanyId: number;
  name: string;
  isActive: boolean;
  url: string;
}
