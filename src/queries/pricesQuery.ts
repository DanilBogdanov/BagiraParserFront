import { getBagiraGoods, getGoodMenu } from '@/api/pricesApi';
import { BagiraGoodRequest } from '@/types/prices';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useGoodMenuQuery = () =>
  useQuery({
    queryKey: ['bagira-goods-menu'],
    queryFn: getGoodMenu,
    staleTime: STALE_TIME,
  });

export const useBagiraGoodQuery = (request: BagiraGoodRequest) =>
  useQuery({
    queryKey: ['bagira-goods', JSON.stringify(request)],
    queryFn: () => getBagiraGoods(request),
    staleTime: STALE_TIME,
  });
