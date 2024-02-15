import { getParserBrands, getParserCompanies } from '@/api/competitorsApi';
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
