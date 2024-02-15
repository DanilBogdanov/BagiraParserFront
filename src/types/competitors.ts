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

export interface ParserGood {
  id: number;
  parserCompanyId: number;
  goodId: number | null;
  lastUpdated: Date;
  brand: string;
  name: string;
  weight: string;
  price: number;
  salePrice: number;
  imgUrl: string | null;
}

export interface ParserGoodRequest {
  parserCompanyId: number;
  brand: string;
  take?: number;
  skip?: number;
}
