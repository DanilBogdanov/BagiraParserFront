import { getGoodMenu } from '@/api/goodsApi';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useGoodMenuQuery = () =>
  useQuery({
    queryKey: ['parser-companies'],
    queryFn: getGoodMenu,
    staleTime: STALE_TIME,
  });
