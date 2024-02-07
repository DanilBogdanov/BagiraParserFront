import { ParserCompany } from '@/types';
import axios from 'axios';

const BASE_URL = 'https://danildev.net';

export async function getParserCompanies(): Promise<ParserCompany[]> {
  const path = `${BASE_URL}/api/parser/v1/companies`;

  const { data: parserCompanies } = await axios.get<ParserCompany[]>(path);

  return parserCompanies;
}
