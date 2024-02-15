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
