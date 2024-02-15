import { getParserCompanies } from '@/api/competitorsApi';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useCompaniesQuery = () =>
  useQuery({
    queryKey: ['parser-companies'],
    queryFn: getParserCompanies,
    staleTime: STALE_TIME,
  });
