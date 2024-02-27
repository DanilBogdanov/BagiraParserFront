import { getGoodMenu } from '@/api/pricesApi';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useGoodMenuQuery = () =>
  useQuery({
    queryKey: ['bagira-goods'],
    queryFn: getGoodMenu,
    staleTime: STALE_TIME,
  });
