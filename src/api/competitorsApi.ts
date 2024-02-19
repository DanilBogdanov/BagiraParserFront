import axios from 'axios';
import {
  ParserCompany,
  ParserGoodRequest,
  ParserGoodResponse,
} from '@/types/competitors';

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

export async function getParserGoods(
  parserGoodRequest: ParserGoodRequest
): Promise<ParserGoodResponse> {
  const path = `${BASE_URL}/api/parser/v1/companies/${parserGoodRequest.parserCompanyId}/goods`;

  const { data: parserGoods } = await axios.get<ParserGoodResponse>(path, {
    params: {
      brand: parserGoodRequest.brand,
      take: parserGoodRequest.take,
      skip: parserGoodRequest.skip,
    },
  });

  return parserGoods;
}
