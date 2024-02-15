import { ParserCompany } from '@/types/competitors';
import axios from 'axios';

const BASE_URL = 'https://danildev.net';

export async function getParserCompanies(): Promise<ParserCompany[]> {
  const path = `${BASE_URL}/api/parser/v1/companies`;

  const { data: parserCompanies } = await axios.get<ParserCompany[]>(path);

  return parserCompanies;
}

export async function getParserBrands(companyId: number): Promise<string[]> {
  const path = `${BASE_URL}/api/parser/v1/companies/${companyId}/brands`;

  const { data: parserBrands } = await axios.get<string[]>(path);

  return parserBrands;
}
