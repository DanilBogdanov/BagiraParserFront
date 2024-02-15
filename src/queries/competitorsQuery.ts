import {
  getParserBrands,
  getParserCompanies,
  getParserGoods,
} from '@/api/competitorsApi';
import { ParserGoodRequest } from '@/types/competitors';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useCompaniesQuery = () =>
  useQuery({
    queryKey: ['parser-companies'],
    queryFn: getParserCompanies,
    staleTime: STALE_TIME,
  });

export const useParserBrandsQuery = (companyId: number) =>
  useQuery({
    queryKey: ['parser-brands', companyId],
    queryFn: () => getParserBrands(companyId),
    staleTime: STALE_TIME,
  });

export const useParserGoodsQuery = (request: ParserGoodRequest) =>
  useQuery({
    queryKey: ['parser-goods', JSON.stringify(request)],
    queryFn: () => getParserGoods(request),
    enabled: !!request.brand,
    staleTime: STALE_TIME,
  });
